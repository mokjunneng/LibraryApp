const database = require("./models/db.js"); //../../models/databases/db

database.getBooks().then(books => {
  //var table = document.createElement("TABLE");
  books.forEach(book => {
    // var table;
    console.log(book);
    // console.log(book.book_id);
    var tr = document.createElement("TR");
    var td = document.createElement("TD");
    td.appendChild(document.createTextNode(Object.values(book)[0]));
    tr.appendChild(td);
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
    if (Object.values(book)[4] == 0 ){
      td.appendChild(document.createTextNode("-"));
    } else {
      td.appendChild(document.createTextNode(Object.values(book)[4]));
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

// function addBookFunction() {
//   database.db.addBook(document.getElementById("book-title", "catagory", "author-name");
// };

// category = document.getElementById("category");
// categorySelected = category.options[category.selectedIndex].text;

var addBook = document.getElementById("add-book-button");
addBook.addEventListener("click", () => {
  var bookLabel = document.getElementById("book-label").value;
  var bookTitle = document.getElementById("book-title").value;
  var categorySelected = document.getElementById("category").value;
  var authorName = document.getElementById("author-name").value;
  database.addBook(bookLabel, bookTitle, categorySelected, authorName);
});

// function myFunction() {
//     var x, text;
//
//     // Get the value of the input field with id="numb"
//     x = document.getElementById("numb").value;
//
//     // If x is Not a Number or less than one or greater than 10
//     if (isNaN(x) || x < 1 || x > 10) {
//         text = "Input not valid";
//     } else {
//         text = "Input OK";
//     }
//     document.getElementById("demo").innerHTML = text;
// }


//addBook.addEventListener("click", console.log("button clicked"));

// document.getElementById("add-book-button").addEventListener("click", function(){
//     this.style.backgroundColor = "red";
// });

//bookId, title, category, author, borrowed_by, date_of_return, date_of_borrow
