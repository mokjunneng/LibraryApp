// const dbUser = require("./controllers/index").user;
// const dbBook = require("./controllers/index").book;
var React = require('react');
var ReactDOM = require('react-dom');
var Table = require('./js/table.js');
var Pagination = require('./js/pagination.js');
var SearchBar = require('./js/search-bar.js');
var moment = require('moment');

class OngoingBorrowersSection extends React.Component {
    constructor() {
        super();
        this.state = {
            subsetData: [],
            totalRecords: 0,
        };
        this.onPageChanged = this.onPageChanged.bind(this);
        this.handleKeyUp = this.handleKeyUp.bind(this);
        this.tableHeaderOptions = [
            {style: {width: "15%"}, name: "Name"},
            {style: {width: "15%"}, name: "IC"},
            {style: {width: "30%"}, name: "Borrowed Book"},
            {style: {width: "20%"}, name: "Due Date"},
            {style: {width: "15%"}, name: "Borrow Times"},
            {style: {width: "5%"}, name: ""},
        ];
        this.delOptions = {
            del: false
        }
        this.pageLimit = 3;
        this.pageNeighbours = 2;
        this.offset = 0;
    }

    componentDidMount() {
        this.fetchBorrowersAndCount(this.offset);
    }

    fetchBorrowersAndCount(offset) {
        dbUser.getSubsetBorrowingUsers(offset, this.pageLimit).then(users => {
            var dataRows = [];
            var promises = [];
            users.forEach(user => {
                let borrowed_books = JSON.parse(user.borrowed_books);
                borrowed_books.forEach(book_label => {
                    promises.push(new Promise((resolve, reject) => {
                        dbBook.getBook(book_label).then(book => {
                            var newUser = {
                                name: user.name,
                                ic: user.ic,
                                borrowed_book: book.title + ` (${book.label})`,
                                due_date: moment(book.date_of_return).utc().format('YYYY-MM-DD'),
                                borrow_times: user.borrow_times
                            };
                            dataRows.push(newUser);
                            resolve();  
                        });
                    }));
                });
            });
           
            Promise.all(promises).then(() => {
                dbUser.getBorrowingUsersCount().then(count => {
                    this.setState({ subsetData : dataRows, totalRecords : count });
                });
            });
            
        }).catch(err => {
            console.log(err);
        });
    }

    handleKeyUp(event) {
        const searchVal = event.target.value;
        if (searchVal) {
            dbUser.search(searchVal).then((users) => {
                var usersData = users[0];
                var searchedUsers = [];
                var promises = [];
                usersData.forEach((user) => {
                    if (!user.borrowing) {
                        return;
                    }
                    let borrowed_books = JSON.parse(user.borrowed_books);
                    borrowed_books.forEach(book_label => {
                        promises.push(new Promise((resolve, reject) => {
                            dbBook.getBook(book_label).then(book => {
                                var newUser = {
                                    name: user.name,
                                    ic: user.ic,
                                    borrowed_book: book.title + ` (${book.label})`,
                                    due_date: moment(book.date_of_return).utc().format('YYYY-MM-DD'),
                                    borrow_times: user.borrow_times
                                };
                                searchedUsers.push(newUser);
                                resolve();
                            });    
                        }));
                    });
                });
                Promise.all(promises).then(() => {
                    dbUser.getBorrowingUsersCount().then(count => {
                        this.setState({ subsetData : searchedUsers, totalRecords : count });
                    });
                });

            }).catch((err) => {
                console.log(err);
            })
        } else {
            this.fetchBorrowersAndCount(this.offset);
        }
    }

    onPageChanged(data) {
        const { currentPage } = data;
        const offset = (currentPage - 1) * this.pageLimit;
        this.fetchBorrowersAndCount(offset);
    }

    render() {
        const { subsetData, totalRecords } = this.state;
        const pageLimit = this.pageLimit;
        const pageNeighbours = this.pageNeighbours;
        const tableHeaderOptions = this.tableHeaderOptions;
        const delOptions = this.delOptions;
        if (!totalRecords) return null;
        return (
            <div>
                <SearchBar placeholder="Search by name or ic..." handleKeyUp={this.handleKeyUp}/>
                <Table subsetData={subsetData} delOptions={delOptions} tableHeaderOptions={tableHeaderOptions} />
                <Pagination totalRecords={totalRecords} pageLimit={pageLimit} pageNeighbours={pageNeighbours} onPageChanged={this.onPageChanged}/>
            </div>
        )
    }
    
}

ReactDOM.render(<OngoingBorrowersSection />, document.getElementById("ongoing-borrowers-root"));