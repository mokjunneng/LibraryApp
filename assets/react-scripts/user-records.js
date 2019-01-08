const dbUser = require("./controllers/index").user;
var React = require('react');
var ReactDOM = require('react-dom');
var Table = require('./js/table.js')
var Pagination = require('./js/pagination.js')
var SearchBar = require('./js/search-bar.js')

class UserRecordsSection extends React.Component {
    constructor() {
        super();
        this.state = {
            data: [],
            subsetData: [],
            totalRecords: 0,
        }
        this.onPageChanged = this.onPageChanged.bind(this);
        this.handleSearch = this.handleSearch.bind(this);
        this.handleKeyUp = this.handleKeyUp.bind(this);
        this.tableHeaderOptions = [
            {style: {width: "35%"}, name: "Tên / Name"},
            {style: {width: "25%"}, name: "Mã số / IC"},
            {style: {width: "15%"}, name: "Thời gian mượn / Borrow Times"},
            {style: {width: "20%"}, name: "Lần cuối thấy / Last Seen"},
            {style: {width: "5%"}, name: ""},
        ]
        // this.totalPageLimit = 5;   // Limit the number of pages of data to be fetched initially
        this.pageLimit = 3
        this.pageNeighbours = 2;
        // Rows fetched will be from offset to rowsLimit
        // this.rowsLimit = this.totalPageLimit * this.pageLimit;
        this.offset = 0;
        // this.lastRowFetched = this.rowsLimit;  // Since initial offset is 0
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
                this.setState({ subsetData : searchedUsers });
            }).catch((err) => {
                console.log(err);
            })
        } else {
            this.fetchUsersAndCount(this.offset);
        }
    }

    handleSearch(searchVal) {s
        dbUser.search(searchVal).then(users => {
            var searchedUsers = [];
            var users = users[0];
            console.log(users);
            if (users) {
                users.forEach((user) => {
                    var newUser = {
                        name: user.name,
                        ic: user.ic,
                        borrow_times: user.borrow_times,
                        last_seen: user.last_seen,
                    }
                    searchedUsers.push(newUser);
                });
            }
            this.setState({ subsetData : searchedUsers});
        }).catch(err => {
            console.log(err);
        })
    }

    onPageChanged(data) {
        const { currentPage } = data;
        const offset = (currentPage - 1) * this.pageLimit;

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

    render() {
        const { subsetData, totalRecords } = this.state;
        const pageLimit = this.pageLimit;
        const pageNeighbours = this.pageNeighbours;
        const tableHeaderOptions = this.tableHeaderOptions;
        if (!totalRecords) return null;
        return (
            <div>
                <SearchBar placeholder="Search by name or ic..." handleSearch={this.handleSearch} handleKeyUp={this.handleKeyUp}/>
                <Table subsetData={subsetData} tableHeaderOptions={tableHeaderOptions} />
                <Pagination totalRecords={totalRecords} pageLimit={pageLimit} pageNeighbours={pageNeighbours} onPageChanged={this.onPageChanged}/>
            </div>
        )
    }
}

ReactDOM.render(<UserRecordsSection />, document.getElementById("user-records-root"));
