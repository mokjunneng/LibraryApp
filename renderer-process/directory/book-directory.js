const database = require("./models/db.js"); //../../models/databases/db

database.getBooks().then(books => {
  //var table = document.createElement("TABLE");
  books.forEach(book => {
    // var table;
    console.log(book);
    // console.log(book.book_id);
    var tr = document.createElement("TR");
    var td = document.createElement("TD");
    td.appendChild(document.createTextNode(Object.values(book)[1]));
    tr.appendChild(td);
    var td = document.createElement("TD");
    td.appendChild(document.createTextNode(Object.values(book)[2]));
    tr.appendChild(td);
    var td = document.createElement("TD");
    td.appendChild(document.createTextNode(Object.values(book)[3]));
    tr.appendChild(td);
    var td = document.createElement("TD");
    td.appendChild(document.createTextNode(Object.values(book)[4]));
    tr.appendChild(td);
    var td = document.createElement("TD");
    if (Object.values(book)[5] == 0 ){
      td.appendChild(document.createTextNode("-"));
    } else {
      td.appendChild(document.createTextNode(Object.values(book)[5]));
    }
    tr.appendChild(td);
    //console.log(tr);
    //table.appendChild(tr);
    document.getElementById("book-catalogue").appendChild(tr);
  })
})

function searchFunction() {
    // Declare variables
    var input, filter, table, tr, td, i, j;
    var countAll = 0;
    var countAppear = 0;
    input = document.getElementById("book-search-input");
    filter = input.value.toUpperCase();
    table = document.getElementById("book-catalogue");
    tr = table.getElementsByTagName("tr");
    // Loop through all table rows, and hide those who don't match the search query
    for (i = 1; i < table.rows.length; i++) {
      for (j = 0; j < 5; j++){
        name = table.rows[i].cells[j].innerHTML;
        // Can consider searching by IC
        if (name) {
            if (name.toUpperCase().indexOf(filter) > -1) {
              countAll++;
              countAppear++;
              console.log(name);
              console.log("countAll = " + countAll);
              console.log("countAppear = " + countAppear);
            } else {
              countAll++;
              }
              if (countAll == 5){
                if (countAppear != 0){
                  tr[i].style.display = "";
                } else {
                  tr[i].style.display = "none";
                }
              }
            }
        }
        countAll = 0;
        countAppear = 0;
    }
};

var input = document.getElementById("book-search-input");
input.addEventListener("keyup", searchFunction);

var addBook = document.getElementById("add-book-button");
addBook.addEventListener("click", () => {
  var bookLabel = document.getElementById("book-label").value;
  var bookTitle = document.getElementById("book-title").value;
  var categorySelected = document.getElementById("category").value;
  var authorName = document.getElementById("author-name").value;
  database.addBook(bookLabel, bookTitle, categorySelected, authorName);
});




import db from './models/db';

const bookLabelHeaderStyle = {
  width: '11%'
};
const titleHeaderStyle = {
  width: '15%'
};
const categoryHeaderStyle = {
  width: '20%'
};
cosnt authorHeaderStyle = {
  width: '20%'
};
const borrowStatusHeaderStyle = {
  width: '25%'
};
const delBookHeaderStyle = {
  width: '5%'
};

function bookRow(props) {
  function handleClick(e) {
    e.target.parentNode.nextElementSibling.classList.toggle("hidden");
  }
  return (
    <tr onClick={handleClick}>
      <td>{props.bookLabel}</td>
      <td>{props.title}</td>
      <td>{props.category}</td>
      <td>{props.author}</td>
      <td>{props.borrowStatus}</td>
      <td><delBookButton /></td>
    </tr>
  );
}

function delBookButton() {
  function handleClick(e) {
    var row = e.target.parentNode.parentNode;
    var bookProfile = row.nextElementSibling;
    var bookLabel = row.childNodes[0].textContent
    db.removeUser(ic).catch(err => {
        return alert("Error deleting user");
    })
    row.parentNode.removeChild(row);
    bookProfile.parentNode.removeChild(bookProfile);
  }
  return (
    <button onClick={handleClick}>DEL</button>
  )
}

const bookProfileStyle = {
  backgroundColor: "#669999",
}

function bookProfile(props) {
  return (
    <tr style={bookProfileStyle} className="hidden book-profile">
      <td colSpan="4"><p>Hello this is the profile of a book</p></td>
    </tr>
  )
}

class bookRecordsTable extends React.Component {
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
  }

  addBook(e) {
    // Disable button while the add book request is being processed
    e.target.classList.add("is-loading");
    var bookLabel = document.getElementById("book-label").value;
    var bookTitle = document.getElementById("book-title").value;
    var categorySelected = document.getElementById("category").value;
    var authorName = document.getElementById("author-name").value;
    database.addBook(bookLabel, bookTitle, categorySelected, authorName);
    // Add user to table
    db.addBook(bookLabel, bookTitle, categorySelected, authorName).then((msg) => {
      db.getBook(bookId).then((book) => {
        this.setState({
          rows: [...this.state.rows, book]
        });
      });
    }).catch((err) => {
      // capture errors
      alert("Book already exists.")
    });
    // clear the input boxes
    document.getElementById("book-title").value = "";
    document.getElementById("book-label").value = "";
    document.getElementById("category").value = "";
    document.getElementById("author-name").value = "";
    e.target.classList.remove("is-loading");
    alert("Book added successfully!")
  }

  expandProfile

  render() {
    return (
      <table id="book-records-table">
        <tbody>
          <tr className="header">
            <th style={bookLabelHeaderStyle}>Book Label</th>
            <th style={titleHeaderStyle}>Title</th>
            <th style={categoryHeaderStyle}>Category</th>
            <th style={authorHeaderStyle}>Author</th>
            <th style={borrowStatusHeaderStyle}>Borrowed by</th>
            <th style={delHeaderStyle}></th>
          </tr>
          {this.state.rows.map((book, i) => [<bookRow bookLabel={book.bookLabel} bookTitle={book.bookTitle} category={book.categorySelected author={book.authorName}} key={i}/>, <bookProfile key={book.title} />])}
        </tbody>
      </table>
    );
  }
}

ReactDOM.render(<bookRecordsTable />, document.getElementById("root"));
