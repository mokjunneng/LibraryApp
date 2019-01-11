// const dbUser = require("./controllers/index").user;
// const dbBook = require("./controllers/index").book;
var React = require('react');
var ReactDOM = require('react-dom');
var Table = require('./js/table.js');
var Pagination = require('./js/pagination.js');
var SearchBar = require('./js/search-bar.js');
var moment = require('moment');
const notifier = require('electron-notifications');


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
            {style: {width: "15%"}, name: "Tên / Name"},
            {style: {width: "15%"}, name: "Mã số / IC"},
            {style: {width: "30%"}, name: "Sách đang được mượn / Borrowed Book"},
            {style: {width: "20%"}, name: "Date of Borrow"},
            {style: {width: "15%"}, name: "Thời hạn mượn sách / Due Date"},
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
            // var dataRows = [];
            var promises = [];
            users.forEach(user => {
                let borrowed_books = JSON.parse(user.borrowed_books);
                borrowed_books.forEach(book_label => {
                    promises.push(new Promise((resolve, reject) => {
                        dbBook.getBook(book_label).then(book => {
                            this.checkOverDueBook(book, user);
                            var newUser = {
                                name: user.name,
                                ic: user.ic,
                                borrowed_book: book.title + ` (${book.label})`,
                                date_of_borrow: moment(book.date_of_borrow).utc().format('DD/MM/YYYY'),
                                due_date: moment(book.date_of_return).utc().format('DD/MM/YYYY'),
                            };
                            // dataRows.push(newUser);
                            resolve(newUser);  
                        });
                    }));
                });
            });
            Promise.all(promises).then((users) => {
                dbUser.getBorrowingUsersCount().then(count => {
                    this.setState({ subsetData : users, totalRecords : count });
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
                // var searchedUsers = [];
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
                                    date_of_borrow: moment(book.date_of_borrow).utc().format('DD/MM/YYYY'),
                                    due_date: moment(book.date_of_return).utc().format('DD/MM/YYYY'),
                                };
                                // searchedUsers.push(newUser);
                                resolve(newUser);
                            });    
                        }));
                    });
                });
                console.log("done")
                Promise.all(promises).then((users) => {
                    dbUser.getBorrowingUsersCount().then(count => {
                        this.setState({ subsetData : users, totalRecords : count });
                    });
                });

            }).catch((err) => {
                console.log(err);
            })
        } else {
            this.fetchBorrowersAndCount(this.offset);
        }
    }

    checkOverDueBook(book, user) {
        var dateNow = new Date(Date.now()).toISOString()
  
        var due_date = moment(book.date_of_return).utc().format('YYYY-MM-DD');
        if (due_date < dateNow) {  
            // Full Options
            const notification = notifier.notify('Overdue', {
                message: book.title + ' by ' + user.name,
                buttons: ['Dismiss'],
                duration: 5000
            })

            notification.on('buttonClicked', (text, buttonIndex, options) => {
                if(text === 'Dismiss') {
                    //open options.url
                    notification.close()
                }
            })
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