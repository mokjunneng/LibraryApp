const db = require("../../models/db")

var shown = document.getElementById("return-button");
shown.addEventListener("click", ()=> { show("Page2","Page1") });

var shown_one = document.getElementById("borrow-button");
shown_one.addEventListener("click", ()=> { show("Page1","Page2") });

var book_label = document.getElementById('borrow-book-label')
book_label.addEventListener("blur", ()=> {
  var book_label_value = document.getElementById('borrow-book-label').value;
  bookcheck(book_label_value,'read-only-book-title','borrow-book-label');
});

var borrower_id = document.getElementById('borrower-id')
borrower_id.addEventListener("blur", ()=> {
var borrower_id_value = document.getElementById('borrower-id').value;
  idcheck(borrower_id_value,'read-only-borrower-name','borrower-id');
});

var submit_borrow_button = document.getElementById('submit-borrow');
submit_borrow_button.addEventListener('click', ()=> {
  update_book_borrow();
});

var book_return = document.getElementById('return-book-label')
book_return.addEventListener("blur", ()=> {
var book_return_value = document.getElementById('return-book-label').value;
 bookcheck(book_return_value,'read-only-return-title','return-book-label')
});

var borrower_id = document.getElementById('returner-id')
borrower_id.addEventListener("blur", ()=> {
var borrower_id_value = document.getElementById('returner-id').value;
  idcheck(borrower_id_value,'read-only-returner-name','returner-id');
});

var submit_return_button = document.getElementById('submit-return');
submit_return_button.addEventListener('click', ()=> {
  update_book_ret()
});

function show(p1, p2) {
  document.getElementById(p1).style.display='block';
  document.getElementById(p2).style.display='none';
  return false;
}

function bookcheck(bookid, title, place){
  if (!bookid) {
    return
  }
  db.getBook(bookid).then((book) => {
    try {
      document.getElementById(title).value = book["title"];
    }catch(err) {
      document.getElementById(place).value = "";
      alert('No such Book ID found');
    }
  })
}
function idcheck(userid, username, place){
  if (!userid) {
    return
  }
  db.getUser(userid).then((user) => {
    try {
      document.getElementById(username).value = user["name"];
    }catch(err) {
      document.getElementById(place).value = "";
      alert('No such User ID found');
    }
  })
}

function update_book_borrow(){
  submit_borrow_button.classList.add("is-loading");
  var book_label = document.getElementById('borrow-book-label').value;
  var user_id = document.getElementById('borrower-id').value;
  var day_of_ret = document.getElementById('due-day').value;
  var month_of_ret = document.getElementById('due-month').value;
  var year_of_ret = document.getElementById('due-year').value;
  var date_of_ret = new Date(`${year_of_ret}-${month_of_ret}-${day_of_ret}T23:59:59+00:00`).toISOString();
  db.getBook(book_label).then(book => {
    if (book.borrowed_by) {
      alert("Book is already being borrowed.");
      submit_borrow_button.classList.remove("is-loading")
      return
    }
    db.updateBook(book_label, book.title, book.category, book.author, user_id, date_of_ret, new Date(Date.now()).toISOString()).then(() => {
      submit_borrow_button.classList.remove("is-loading")
      // alert("Book successfully borrowed!")
    }).catch(err => {
      alert("Error updating book");
      submit_borrow_button.classList.remove("is-loading")
    })
  })
  document.getElementById("borrow-form").reset();
}

function update_book_ret(){
  submit_return_button.classList.add("is-loading")
  var book_label = document.getElementById('return-book-label').value;
  var user_id = document.getElementById('returner-id').value;
  db.getBook(book_label).then(book => {
    if (book.borrowed_by !== user_id) {
      alert("Wrong borrower id");
      submit_return_button.classList.remove("is-loading")
      return
    }
    db.updateBook(book_label, book.title, book.category, book.author, 0, "", "").then(() => {
      submit_return_button.classList.remove("is-loading")
      // alert("Book successfully returned!")
    }).catch(err => {
      alert("Error updating book");
      submit_return_button.classList.remove("is-loading")
    })
  })
  document.getElementById("return-form").reset();
}
