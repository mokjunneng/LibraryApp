import db from './models/db';

function BookRow(props) {
  return (
    <tr>
      <td>{props.book_label}</td>
      <td>{props.book_title}</td>
      <td>{props.category}</td>
      <td>{props.author}</td>
      <td>{props.borrowed_by}</td>
      <td><DelBookButton /></td>
    </tr>
  );
}

function DelBookButton() {
  function handleClick(e) {
    var row = e.target.parentNode.parentNode;
    var book_label = row.childNodes[0].textContent
    db.removeBook(book_label).catch(err => {
        return alert("Error deleting user");
    })
    row.parentNode.removeChild(row);
  }
  return (
    <button onClick={handleClick}>DEL</button>
  )
}

const bookProfileStyle = {
  backgroundColor: "#669999",
}

class BookRecordsTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      rows: []
    };
  }

  componentDidMount() {
    // Populate table
    db.getBooks().then(books => {
      var newRows = this.state.rows.slice();
      books.forEach(book => {
        newRows.push(book);
      })
      this.setState({
        rows: newRows
      });
    }).catch(err => {
      console.log(err)
    });
    // Add book function
    var addBookBtn = document.getElementById("add-book-btn");
    addBookBtn.addEventListener("click", (e) => {
      this.addBook(e);
    });
    // Search function
    var searchBar = document.getElementById("book-search-input");
    searchBar.addEventListener("keyup", (e) => {
      this.searchFunction(e);
    });
  }

  searchFunction(e) {
    var filter = e.target.value.trim().toUpperCase();
    var rows = Array.prototype.slice.call(document.getElementById("book-records-table").querySelectorAll("tr:not(.header):not(.book-profile)"));
    rows.forEach((row) => {
      var data = "";
      Array.prototype.slice.call(row.getElementsByTagName("td")).forEach((col) => {
        data += col.textContent;
      });
      if(data.toUpperCase().indexOf(filter) > -1) {
        row.classList.remove("hidden");
      } else {
        row.classList.add("hidden");
      };
    });
    console.log("searching...");
  }

  addBook(e) {
    // Disable button while the add book request is being processed
    e.target.classList.add("is-loading");
    var book_label = document.getElementById("book-label").value;
    var book_title = document.getElementById("book-title").value;
    var category = document.getElementById("category").value;
    var author = document.getElementById("author-name").value;
    // Add user to table
    db.addBook(book_label, book_title, category, author).then((msg) => {
      db.getBook(book_label).then((book) => {
        this.setState({
          rows: [...this.state.rows, book]
        });
      });
    }).catch((err) => {
      // capture errors
      alert("Error adding books.")
    });
    // clear the input boxes
    document.getElementById("book-title").value = "";
    document.getElementById("book-label").value = "";
    document.getElementById("category").value = "";
    document.getElementById("author-name").value = "";
    e.target.classList.remove("is-loading");
    alert("Book added successfully!")
  }

  render() {
    return (
      <table id="book-records-table">
        <tbody>
          <tr className="header">
            <th style={{width: '15%'}}>Book Label</th>
            <th style={{width: '15%'}}>Title</th>
            <th style={{width: '20%'}}>Category</th>
            <th style={{width: '20%'}}>Author</th>
            <th style={{width: '25%'}}>Borrowed by</th>
            <th style={{width: '5%'}}></th>
          </tr>
          {this.state.rows.map((book, i) => <BookRow book_label={book.book_label} book_title={book.title} category={book.category} author={book.author} borrowed_by={book.borrowed_by} key={i}/>)}
        </tbody>
      </table>
    );
  }
}

ReactDOM.render(<BookRecordsTable />, document.getElementById("root"));
