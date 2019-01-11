var React = require('react');

class AddBookSection extends React.Component {
    constructor(props) {
        super(props);
        this.addBook = this.addBook.bind(this);
    }

    addBook(event) {
        event.target.classList.add("is-loading");
        var book_label = document.getElementById("book-label").value;
        if (this.checkEmptyField(book_label)) {
            document.getElementById("book-label").focus();
            event.target.classList.remove("is-loading");
            alert('Book Label field is missing! / Không tìm thấy nhãn sách ');
            return
        }
        var book_title = document.getElementById("book-title").value;
        if (this.checkEmptyField(book_title)) {
            document.getElementById("book-title").focus();
            event.target.classList.remove("is-loading");
            alert('Book Title field is missing! / Không tìm thấy tên sách');
            return
        }
        var category = document.getElementById("category").value;
        if (this.checkEmptyField(category)) {
            document.getElementById("category").focus();
            event.target.classList.remove("is-loading");
            alert('Category field is missing! / Không tìm thấy phân loại sách');
            return
        }
        var author = document.getElementById("author-name").value;
        if (this.checkEmptyField(author)) {
            document.getElementById("author-name").focus();
            event.target.classList.remove("is-loading");
            alert('Author field is missing! / Không tìm thấy tên tác giả ');
            return
        }
        // Add user to table
        dbBook.addBook(book_label.toUpperCase(), book_title, category, author).then(() => {
            this.props.addedBook();
            alert("Book added successfully!/ Sách đã được thêm thành công");
        }).catch(err => {
            alert("Error adding Book! / Lỗi thêm sách")
        });
        // clear the input boxes
        document.getElementById("book-title").value = "";
        document.getElementById("book-label").value = "";
        document.getElementById("category").value = "";
        document.getElementById("author-name").value = "";
        event.target.classList.remove("is-loading");
    }

    checkEmptyField(value) {
        if (value === "") {
            return true
        }
        return false
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
                                <option value="Từ điển">Từ điển / Dictionary</option>
                                <option value="Lịch sử">Lịch sử / History</option>
                                <option value="Nông nghiệp">Nông nghiệp / Agriculture</option>
                                <option value="Luật">Luật / Law</option>
                                <option value="Văn hóa">Văn hóa / Culture</option>
                                <option value="Kiến thức chung">Kiến thức chung / Common Knowledge</option>
                                <option value="Kỹ năng sống">Kỹ năng sống / Essential Skills - Self Help</option>
                                <option value="Trẻ em gia đình">Trẻ em gia đình / Parenting </option>
                                <option value="Văn học Việt Nam">Văn học Việt Nam / Vietnamese Literature</option>
                                <option value="Hạt gống tâm hồn">Hạt gống tâm hồn</option>
                                <option value="Văn học nước ngoài">Văn học nước ngoài / Foreign Literature</option>
                                <option value="Máy tính">Máy tính / Computing</option>
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