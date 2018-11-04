const database = require("./models/db.js"); //../../models/databases/db

database.db.getBooks().then(books => {
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
}

input = document.getElementById("book-search-input");
input.addEventListener("keyup", searchFunction);
