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
            return;
        }
        var book_title = document.getElementById("book-title").value;
        if (this.checkEmptyField(book_title)) {
            document.getElementById("book-title").focus();
            event.target.classList.remove("is-loading");
            alert('Book Title field is missing! / Không tìm thấy tên sách');
            return;
        }
        var category = document.getElementById("category").value;
        if (this.checkEmptyField(category)) {
            document.getElementById("category").focus();
            event.target.classList.remove("is-loading");
            alert('Category field is missing! / Không tìm thấy phân loại sách');
            return;
        }
        var author = document.getElementById("author-name").value;
        if (this.checkEmptyField(author)) {
            document.getElementById("author-name").focus();
            event.target.classList.remove("is-loading");
            alert('Author field is missing! / Không tìm thấy tên tác giả ');
            return;
        }
        // Add user to table
        dbBook.addBook(book_label.toUpperCase(), book_title, category, author).then(() => {
            this.props.addedBook();
            alert("Book added successfully!/ Sách đã được thêm thành công");
        }).catch(err => {
            alert("Error adding Book! / Lỗi thêm sách");
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
            return true;
        }
        return false;
    }

    render() {
        return React.createElement(
            "div",
            null,
            React.createElement(
                "h2",
                null,
                "Th\xEAm s\xE1ch / Add Books "
            ),
            React.createElement(
                "div",
                { className: "columns" },
                React.createElement(
                    "div",
                    { className: "column" },
                    React.createElement(
                        "label",
                        { className: "label" },
                        "T\xEAn s\xE1ch / Title"
                    ),
                    React.createElement(
                        "div",
                        { className: "control has-icons-left has-icons-right" },
                        React.createElement("input", { className: "input", type: "text", placeholder: "Book's Title", id: "book-title" }),
                        React.createElement(
                            "span",
                            { className: "icon is-small is-left" },
                            React.createElement("i", { className: "fas fa-book" })
                        )
                    ),
                    React.createElement(
                        "label",
                        { className: "label" },
                        "T\xE1c gi\u1EA3 / Author"
                    ),
                    React.createElement(
                        "div",
                        { className: "control has-icons-left has-icons-right" },
                        React.createElement("input", { className: "input", type: "text", placeholder: "Author's Name", id: "author-name" }),
                        React.createElement(
                            "span",
                            { className: "icon is-small is-left" },
                            React.createElement("i", { className: "fas fa-user" })
                        )
                    )
                ),
                React.createElement(
                    "div",
                    { className: "column" },
                    React.createElement(
                        "label",
                        { className: "label" },
                        "Ph\xE2n lo\u1EA1i / Category"
                    ),
                    React.createElement(
                        "div",
                        { id: "genre", className: "select control" },
                        React.createElement(
                            "select",
                            { id: "category" },
                            React.createElement(
                                "option",
                                { value: "T\u1EEB \u0111i\u1EC3n" },
                                "T\u1EEB \u0111i\u1EC3n / Dictionary"
                            ),
                            React.createElement(
                                "option",
                                { value: "L\u1ECBch s\u1EED" },
                                "L\u1ECBch s\u1EED / History"
                            ),
                            React.createElement(
                                "option",
                                { value: "N\xF4ng nghi\u1EC7p" },
                                "N\xF4ng nghi\u1EC7p / Agriculture"
                            ),
                            React.createElement(
                                "option",
                                { value: "Lu\u1EADt" },
                                "Lu\u1EADt / Law"
                            ),
                            React.createElement(
                                "option",
                                { value: "V\u0103n h\xF3a" },
                                "V\u0103n h\xF3a / Culture"
                            ),
                            React.createElement(
                                "option",
                                { value: "Ki\u1EBFn th\u1EE9c chung" },
                                "Ki\u1EBFn th\u1EE9c chung / Common Knowledge"
                            ),
                            React.createElement(
                                "option",
                                { value: "K\u1EF9 n\u0103ng s\u1ED1ng" },
                                "K\u1EF9 n\u0103ng s\u1ED1ng / Essential Skills - Self Help"
                            ),
                            React.createElement(
                                "option",
                                { value: "Tr\u1EBB em gia \u0111\xECnh" },
                                "Tr\u1EBB em gia \u0111\xECnh / Parenting "
                            ),
                            React.createElement(
                                "option",
                                { value: "V\u0103n h\u1ECDc Vi\u1EC7t Nam" },
                                "V\u0103n h\u1ECDc Vi\u1EC7t Nam / Vietnamese Literature"
                            ),
                            React.createElement(
                                "option",
                                { value: "H\u1EA1t g\u1ED1ng t\xE2m h\u1ED3n" },
                                "H\u1EA1t g\u1ED1ng t\xE2m h\u1ED3n"
                            ),
                            React.createElement(
                                "option",
                                { value: "V\u0103n h\u1ECDc n\u01B0\u1EDBc ngo\xE0i" },
                                "V\u0103n h\u1ECDc n\u01B0\u1EDBc ngo\xE0i / Foreign Literature"
                            ),
                            React.createElement(
                                "option",
                                { value: "M\xE1y t\xEDnh" },
                                "M\xE1y t\xEDnh / Computing"
                            )
                        )
                    ),
                    React.createElement(
                        "label",
                        { className: "label" },
                        "Nh\xE3n s\xE1ch / Book Label"
                    ),
                    React.createElement(
                        "div",
                        { className: "control has-icons-left has-icons-right" },
                        React.createElement("input", { className: "input", type: "text", placeholder: "Book Label", id: "book-label" }),
                        React.createElement(
                            "span",
                            { className: "icon is-small is-left" },
                            React.createElement("i", { className: "fas fa-archive" })
                        )
                    )
                )
            ),
            React.createElement(
                "div",
                null,
                React.createElement(
                    "button",
                    { className: "button is-success", id: "add-book-btn", onClick: this.addBook },
                    React.createElement(
                        "span",
                        { className: "icon is-small" },
                        React.createElement("i", { className: "fas fa-check" })
                    ),
                    React.createElement(
                        "span",
                        null,
                        "Th\xEAm s\xE1ch / Add Book"
                    )
                )
            )
        );
    }
}

module.exports = AddBookSection;