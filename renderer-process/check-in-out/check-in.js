const db = require("../../models/db")

// Attach onClick eventListeners to borrow/return link
var shown = document.getElementById("return-button");
shown.addEventListener("click", ()=> { show("Page2","Page1") });
var shown_one = document.getElementById("borrow-button");
shown_one.addEventListener("click", ()=> { show("Page1","Page2") });

// Attach onBlur eventListeners to input fields
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

// Attach onClick eventListeners to submit buttons
var submit_borrow_button = document.getElementById('submit-borrow');
submit_borrow_button.addEventListener('click', ()=> {
  update_book_borrow();
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
    } catch(err) {
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
    } catch(err) {
      document.getElementById(place).value = "";
      alert('No such User ID found');
    }
  })
}

function checkEmptyField(val, field, alertMsg) {
  if (!val) {
    alert(alertMsg);
    document.getElementById(field).focus();
    return true
  }
  return false
}

function update_book_borrow(){
  var book_label = document.getElementById('borrow-book-label').value;
  if (checkEmptyField(book_label, "borrow-book-label", "Book ID field is empty!")) { return }
  var user_id = document.getElementById('borrower-id').value;
  if (checkEmptyField(user_id, "borrower-id", "Borrower ID field is empty!")) { return }
  var date_of_ret = document.getElementById("due-date-picker").value
  // Set default due date to 2 weeks later if not specified
  if (!date_of_ret) {
    date_of_ret = new Date();
    date_of_ret.setDate(date_of_ret.getDate()+14);
  } else {
    date_of_ret = new Date(date_of_ret);
  }
  submit_borrow_button.classList.add("is-loading");
  db.getBook(book_label).then(book => {
  if (book.borrowed_by) {
      alert("Book is already being borrowed.");
      submit_borrow_button.classList.remove("is-loading");
      return
    }
    db.updateBook(book_label, book.title, book.category, book.author, user_id, date_of_ret.toISOString(), new Date(Date.now()).toISOString()).then(() => {
      submit_borrow_button.classList.remove("is-loading");
      update_user(user_id, book_label);
    }).catch(err => {
      alert("Error updating book");
      submit_borrow_button.classList.remove("is-loading");
    });
  });
  // TODO:clear date picker value
  document.getElementById("borrow-form").reset();
}

function update_book_ret(){
  var book_label = document.getElementById('return-book-label').value;
  if (checkEmptyField(book_label, "return-book-label", "Book ID field is empty!")) { return }
  var user_id = document.getElementById('returner-id').value;
  if (checkEmptyField(user_id, "returner-id", "Borrower ID field is empty!")) { return }
  submit_return_button.classList.add("is-loading");
  db.getBook(book_label).then(book => {
    // Noone borrowing
    if (!book.borrowed_by) {
      alert("Book has not been borrowed by anyone.");
      submit_return_button.classList.remove("is-loading");
      return
    }
    // User id mismatch
    if (book.borrowed_by !== user_id) {
      alert("Wrong borrower id");
      submit_return_button.classList.remove("is-loading");
      return
    }
    db.updateBook(book_label, book.title, book.category, book.author, 0, "", "").then(() => {
      submit_return_button.classList.remove("is-loading");
      update_user(user_id, book_label, borrow=false);
    }).catch(err => {
      alert("Error updating book");
      submit_return_button.classList.remove("is-loading");
    });
  });
  document.getElementById("return-form").reset();
}

function update_user(ic, book_label, borrow=true) {
  db.getUser(ic).then(user => {
    var borrowed_books = JSON.parse(user.borrowed_books);
    // Initialize array
    if (!borrowed_books) { borrowed_books = []; }
    if (borrow) {
      borrowed_books.push(book_label)
    } else if (borrowed_books) {
      var index = borrowed_books.indexOf(book_label);
      if (index > -1) {
        borrowed_books.splice(index, 1);
      }
    }
    db.updateUser(ic, user.name, JSON.stringify(borrowed_books)).catch(err => {
      alert("Error updating user.")
    })
  }).catch(err => {
    console.log(err)
    alert("Error getting user.")
  })
}
