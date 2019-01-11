const dbUser = require("./controllers/index").user;
var React = require('react');
var ReactDOM = require('react-dom');
var Table = require('./js/table.js')
var Pagination = require('./js/pagination.js')
var SearchBar = require('./js/search-bar.js')
var AddUser = require('./js/add-user.js')

class UserRecordsSection extends React.Component {
    constructor() {
        super();
        this.state = {
            data: [],
            subsetData: [],
            totalRecords: 0,
        }
        this.onPageChanged = this.onPageChanged.bind(this);
        this.handleKeyUp = this.handleKeyUp.bind(this);
        this.addedUser = this.addedUser.bind(this);
        this.removedRow = this.removedRow.bind(this);
        this.tableHeaderOptions = [
            {style: {width: "35%"}, name: "Tên / Name"},
            {style: {width: "25%"}, name: "Mã số / IC"},
            {style: {width: "15%"}, name: "Thời gian mượn / Borrow Times"},
            {style: {width: "20%"}, name: "Lần cuối thấy / Last Seen"},
            {style: {width: "5%"}, name: ""},
        ]
        this.delOptions = {
            del: true,
            db: "User",
            queryCol: 2
        }
        this.pageLimit = 3
        this.pageNeighbours = 2;
        this.offset = 0;
        this.currentPage = 1;
    }

    componentDidMount() {
        this.fetchUsersAndCount(this.offset);
    }

    fetchUsersAndCount(offset) {
        dbUser.getSubsetUsers(offset, this.pageLimit).then((users) => {
            var dataRows = [];
            users.forEach((user) => {
                var newUser = {
                    name: user.name,    
                    ic: user.ic,
                    borrow_times: user.borrow_times,
                    last_seen: user.last_seen,
                }
                dataRows.push(newUser);
            });
            dbUser.getUsersCount().then((count) => {
                this.setState({ subsetData : dataRows, totalRecords: count });
            });
        });
    }

    handleKeyUp(event) {
        const searchVal = event.target.value;
        if (searchVal) {
            dbUser.search(searchVal).then((users) => {
                var users = users[0];
                var searchedUsers = [];
                if (users) {  
                    users.forEach((user) => {
                        var newUser = {
                            name: user.name,    
                            ic: user.ic,
                            borrow_times: user.borrow_times,
                            last_seen: user.last_seen,
                        }
                        searchedUsers.push(newUser);
                    })
                }
                this.setState({ subsetData : searchedUsers, totalRecords : 1 });
            }).catch((err) => {
                console.log(err);
            })
        } else {
            this.fetchUsersAndCount(this.offset);
        }
    }

    onPageChanged(data) {
        const { currentPage } = data;
        const offset = (currentPage - 1) * this.pageLimit;
        this.currentPage = currentPage;

        dbUser.getSubsetUsers(offset, this.pageLimit).then(users => {
            var subsetUsers = [];
            users.forEach(user => {
                var newUser = {
                    name: user.name,    
                    ic: user.ic,
                    borrow_times: user.borrow_times,
                    last_seen: user.last_seen,
                }
                subsetUsers.push(newUser);
            });
            this.setState({ subsetData : subsetUsers });
        });
    }

    addedUser() {
        let offset = (this.currentPage - 1) * this.pageLimit;
        this.fetchUsersAndCount(offset);
    }

    removedRow() {
        let offset = (this.currentPage - 1) * this.pageLimit;
        this.fetchUsersAndCount(offset);
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
                <div style={{height: "60%"}}>
                    <SearchBar placeholder="Search by name or ic... / Tìm kiếm bằng tên hoặc mã số ..." handleKeyUp={this.handleKeyUp}/>
                    <Table subsetData={subsetData} delOptions={delOptions} tableHeaderOptions={tableHeaderOptions} removedRow={this.removedRow}/>
                    <Pagination totalRecords={totalRecords} pageLimit={pageLimit} pageNeighbours={pageNeighbours} onPageChanged={this.onPageChanged}/>
                </div>
                <br></br>
                <AddUser addedUser={this.addedUser} />
            </div>
        )
    }
}

ReactDOM.render(<UserRecordsSection />, document.getElementById("user-records-root"));
