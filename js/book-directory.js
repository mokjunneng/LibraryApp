const dbBook = require("./controllers/index").book;
var React = require('react');
var ReactDOM = require('react-dom');
var Table = require('./js/table.js');
var Pagination = require('./js/pagination.js');
var SearchBar = require('./js/search-bar.js');
var AddBook = require('./js/add-book.js');

class BookDirectorySection extends React.Component {
    constructor() {
        super();
        this.state = {
            subsetData: [],
            totalRecords: 0
        };
        this.onPageChanged = this.onPageChanged.bind(this);
        this.handleKeyUp = this.handleKeyUp.bind(this);
        this.addedBook = this.addedBook.bind(this);
        this.removedRow = this.removedRow.bind(this);
        this.tableHeaderOptions = [{ style: { width: "15%" }, name: "Nhãn / Label" }, { style: { width: "15%" }, name: "Tên / Title" }, { style: { width: "20%" }, name: "Phân loại / Category" }, { style: { width: "20%" }, name: "Tác giả / Author" }, { style: { width: "25%" }, name: "Mượn bởi / Borrowed by" }, { style: { width: "5%" }, name: "" }];
        this.delOptions = {
            del: true,
            db: "Book",
            queryCol: 1
        };
        this.pageLimit = 3;
        this.pageNeighbours = 2;
        this.offset = 0;
        this.currentPage = 1;
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
                };
                dataRows.push(newBook);
            });
            dbBook.getBooksCount().then(count => {
                this.setState({ subsetData: dataRows, totalRecords: count });
            });
        });
    }

    handleKeyUp(event) {
        const searchVal = event.target.value;
        if (searchVal) {
            dbBook.search(searchVal).then(books => {
                var books = books[0];
                var searchedBooks = [];
                if (books) {
                    books.forEach(book => {
                        var newBook = {
                            label: book.label,
                            title: book.title,
                            category: book.category,
                            author: book.author,
                            borrowed_by: book.borrowed_by
                        };
                        searchedBooks.push(newBook);
                    });
                }
                this.setState({ subsetData: searchedBooks, totalRecords: 1 });
            }).catch(err => {
                console.log(err);
            });
        } else {
            this.fetchBooksAndCount(this.offset);
        }
    }

    onPageChanged(data) {
        const { currentPage } = data;
        this.currentPage = currentPage;
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
                };
                subsetBooks.push(newBook);
            });
            this.setState({ subsetData: subsetBooks });
        });
    }

    addedBook() {
        let offset = (this.currentPage - 1) * this.pageLimit;
        this.fetchBooksAndCount(offset);
    }

    removedRow() {
        let offset = (this.currentPage - 1) * this.pageLimit;
        this.fetchBooksAndCount(offset);
    }

    render() {
        const { subsetData, totalRecords } = this.state;
        const pageLimit = this.pageLimit;
        const pageNeighbours = this.pageNeighbours;
        const tableHeaderOptions = this.tableHeaderOptions;
        const delOptions = this.delOptions;
        return React.createElement(
            'div',
            null,
            totalRecords ? React.createElement(
                'div',
                { style: { height: "60%" } },
                React.createElement(SearchBar, { placeholder: 'Search by label, title, category, author... / T\xECm ki\u1EBFm b\u1EB1ng nh\xE3n, t\xEAn, ph\xE2n lo\u1EA1i, t\xE1c gi\u1EA3...', handleKeyUp: this.handleKeyUp }),
                React.createElement(Table, { subsetData: subsetData, delOptions: delOptions, tableHeaderOptions: tableHeaderOptions, removedRow: this.removedRow }),
                React.createElement(Pagination, { totalRecords: totalRecords, pageLimit: pageLimit, pageNeighbours: pageNeighbours, onPageChanged: this.onPageChanged })
            ) : null,
            React.createElement('br', null),
            React.createElement(AddBook, { addedBook: this.addedBook })
        );
    }
}

ReactDOM.render(React.createElement(BookDirectorySection, null), document.getElementById("book-directory-root"));