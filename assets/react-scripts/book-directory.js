const dbBook = require("./controllers/index").book;
var React = require('react');
var ReactDOM = require('react-dom');
var Table = require('./js/table.js')
var Pagination = require('./js/pagination.js')
var SearchBar = require('./js/search-bar.js')

class BookDirectorySection extends React.Component {
    constructor() {
        super();
        this.state = {
            subsetData: [],
            totalRecords: 0,
        }
        this.onPageChanged = this.onPageChanged.bind(this);
        this.handleSearch = this.handleSearch.bind(this);
        this.handleKeyUp = this.handleKeyUp.bind(this);
        this.tableHeaderOptions = [
            {style: {width: "15%"}, name: "Label"},
            {style: {width: "15%"}, name: "Title"},
            {style: {width: "20%"}, name: "Category"},
            {style: {width: "20%"}, name: "Author"},
            {style: {width: "25%"}, name: "Borrowed by"},
            {style: {width: "5%"}, name: ""},
        ]
        // this.totalPageLimit = 5;   // Limit the number of pages of data to be fetched initially
        this.pageLimit = 3
        this.pageNeighbours = 2;
        // Rows fetched will be from offset to rowsLimit
        // this.rowsLimit = this.totalPageLimit * this.pageLimit;
        this.offset = 0;
    }

    componentDidMount() {
        this.fetchBooksAndCount(this.offset);
    }

    fetchBooksAndCount(offset) {
        dbBook.getSubsetBooks(offset, this.pageLimit).then(books => {
            var dataRows = [];
            books.forEach(book => {
                var newBook = {
                    label: book.label,
                    title: book.title,
                    category: book.category,
                    author: book.author,
                    borrowed_by: book.borrowed_by
                }
                dataRows.push(newBook);
            });
            dbBook.getBooksCount().then((count) => {
                this.setState({ subsetData : dataRows, totalRecords : count });
            });
        });
    }

    handleKeyUp(event) {
        const searchVal = event.target.value;
        if (searchVal) {
            dbBook.search(searchVal).then((books) => {
                var books = books[0];
                var searchedBooks = [];
                if (books) {  
                    books.forEach((book) => {
                        var newBook = {
                            label: book.label,
                            title: book.title,
                            category: book.category,
                            author: book.author,
                            borrowed_by: book.borrowed_by
                        }
                        searchedBooks.push(newBook);
                    })
                }
                this.setState({ subsetData : searchedBooks });
            }).catch((err) => {
                console.log(err);
            })
        } else {
            this.fetchBooksAndCount(this.offset);
        }
    }

    handleSearch(searchVal) {
        dbBook.search(searchVal).then(books => {
            var searchedBooks = [];
            var books = books[0];
            if (books) {
                books.forEach((book) => {
                    var newBook = {
                        label: book.label,
                        title: book.title,
                        category: book.category,
                        author: book.author,
                        borrowed_by: book.borrowed_by
                    }
                    searchedBooks.push(newBook);
                });
            }
            this.setState({ subsetData : searchedBooks});
        }).catch(err => {
            console.log(err);
        })
    }

    onPageChanged(data) {
        const { currentPage } = data;
        const offset = (currentPage - 1) * this.pageLimit;

        dbBook.getSubsetBooks(offset, this.pageLimit).then(books => {
            var subsetBooks = [];
            books.forEach(book => {
                var newBook = {
                    label: book.label,
                    title: book.title,
                    category: book.category,
                    author: book.author,
                    borrowed_by: book.borrowed_by
                }
                subsetBooks.push(newBook);
            });
            this.setState({ subsetData : subsetBooks });
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
                <SearchBar placeholder="Search by label, title, category, author..." handleSearch={this.handleSearch} handleKeyUp={this.handleKeyUp}/>
                <Table subsetData={subsetData} tableHeaderOptions={tableHeaderOptions} />
                <Pagination totalRecords={totalRecords} pageLimit={pageLimit} pageNeighbours={pageNeighbours} onPageChanged={this.onPageChanged}/>
            </div>
        )
    }
}

ReactDOM.render(<BookDirectorySection />, document.getElementById("book-directory-root"));