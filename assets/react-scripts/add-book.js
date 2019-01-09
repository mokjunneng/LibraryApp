var React = require('react');

class AddBookSection extends React.Component {
    constructor(props) {
        super(props);
        this.addBook = this.addBook.bind(this);
    }

    addBook(event) {
        event.target.classList.add("is-loading");
        var book_label = document.getElementById("book-label").value;
        var book_title = document.getElementById("book-title").value;
        var category = document.getElementById("category").value;
        var author = document.getElementById("author-name").value;
        // Add user to table
        dbBook.addBook(book_label, book_title, category, author).then(() => {
            this.props.addedBook();
        });
        // clear the input boxes
        document.getElementById("book-title").value = "";
        document.getElementById("book-label").value = "";
        document.getElementById("category").value = "";
        document.getElementById("author-name").value = "";
        event.target.classList.remove("is-loading");
        alert("Book added successfully!");
    }

    render() {
        return (
            <div>
                <h2>Thêm sách / Add Books </h2>
                <div className="columns">
                    <div className="column">
                        <label className="label">Tên sách / Title</label>
                        <div className="control has-icons-left has-icons-right">
                            <input className="input" type="text" placeholder="Book's Title" id="book-title"></input>
                            <span className="icon is-small is-left">
                                <i className="fas fa-book"></i>
                            </span>
                        </div>
                        <label className="label">Tác giả / Author</label>
                        <div className="control has-icons-left has-icons-right">
                            <input className="input" type="text" placeholder="Author's Name" id="author-name"></input>
                            <span className="icon is-small is-left">
                                <i className="fas fa-user"></i>
                            </span>
                        </div>
                    </div>
                    <div className="column">
                        <label className="label">Phân loại / Category</label>
                        <div id="genre" className="select control">
                            <select id="category">
                                <option value="Action">Action</option>
                                <option value="Adventure">Adventure</option>
                                <option value="Classic">Classic</option>
                                <option value="Comic">Comic</option>
                                <option value="Crime">Crime</option>
                                <option value="Fantasy">Fantasy</option>
                                <option value="Science Fiction">Science Fiction</option>
                                <option value="Bibliography">Bibliography</option>
                                <option value="Children's Literature">Children's Literature</option>
                            </select>
                        </div>
                        <label className="label">Nhãn sách / Book Label</label>
                        <div className="control has-icons-left has-icons-right">
                            <input className="input" type="text" placeholder="Book Label" id="book-label"></input>
                            <span className="icon is-small is-left">
                                <i className="fas fa-archive"></i>
                            </span>
                        </div>
                    </div>
                </div>
                <div>
                    <button className="button is-success" id="add-book-btn" onClick={this.addBook}>
                        <span className="icon is-small">
                            <i className="fas fa-check"></i>
                        </span>
                        <span>Thêm sách / Add Book</span>
                    </button>
                </div>
            </div>
        );
    }
}

module.exports = AddBookSection;