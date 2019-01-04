const defaultDueDate = 14;

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
var borrower_ic = document.getElementById('borrower-ic')
borrower_ic.addEventListener("blur", ()=> {
  var borrower_ic_value = document.getElementById('borrower-ic').value;
  idcheck(borrower_ic_value,'read-only-borrower-name','borrower-ic');
});
var book_return = document.getElementById('return-book-label')
book_return.addEventListener("blur", ()=> {
  var book_return_value = document.getElementById('return-book-label').value;
  bookcheck(book_return_value,'read-only-return-title','return-book-label')
});
var borrower_ic = document.getElementById('returner-ic')
borrower_ic.addEventListener("blur", ()=> {
  var borrower_ic_value = document.getElementById('returner-ic').value;
  idcheck(borrower_ic_value,'read-only-returner-name','returner-ic');
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

function bookcheck(label, title, place){
  if (!label) {
    return
  }
  dbBook.getBook(label).then((book) => {
    document.getElementById(title).value = book.title;
  }).catch(err => {
    document.getElementById(title).value = "";
    document.getElementById(place).value = "";
    document.getElementById(place).focus();
    alert("No such book found!");
  });
}
function idcheck(useric, username, place){
  if (!useric) {
    return
  }
  dbUser.getUser(useric).then((user) => {
    document.getElementById(username).value = user.name;
  }).catch(err => {
    document.getElementById(username).value = "";
    document.getElementById(place).value = "";
    document.getElementById(place).focus();
    alert('No such User IC found');
  });
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
  var user_ic = document.getElementById('borrower-ic').value;
  if (checkEmptyField(user_ic, "borrower-ic", "Borrower IC field is empty!")) { return }
  var date_of_ret = document.getElementById("date-of-return").value
  // Set default due date to 2 weeks later if not specified
  if (!date_of_ret) {
    date_of_ret = new Date();
    date_of_ret.setDate(date_of_ret.getDate() + defaultDueDate);
  } else {
    try {
      date_of_ret = new Date(date_of_ret);

      var dateNow = new Date();
      dateNow = dateNow.getTime();
      var date_of_ret_compare = date_of_ret.getTime();

      if (date_of_ret_compare < dateNow) {
        alert("Invalid date chosen!");
        document.getElementById("date-of-return").focus();
        return
      }
    } catch (err) {
      alert("Incorrect date format.")
    }
  }
  submit_borrow_button.classList.add("is-loading");
  dbBook.getBook(book_label).then(book => {
    if (book.borrowed_by) {
        alert("Book is already being borrowed.");
        submit_borrow_button.classList.remove("is-loading");
        return
    }
    var updateObject = {
      label: book_label, 
      date_of_return: date_of_ret.toISOString(),
      date_of_borrow: new Date(Date.now()).toISOString(),
      borrowed_by: user_ic,
    }
    dbBook.updateBook(updateObject).then((user) => {
      submit_borrow_button.classList.remove("is-loading");
      update_user(user_ic, book_label, borrow=true);
    }).catch(err => {
      console.log(err)
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
  var user_ic = document.getElementById('returner-ic').value;
  if (checkEmptyField(user_ic, "returner-ic", "Borrower IC field is empty!")) { return }
  submit_return_button.classList.add("is-loading");
  dbBook.getBook(book_label).then(book => {
    // Noone borrowing
    if (!book.borrowed_by) {
      alert("Book has not been borrowed by anyone.");
      submit_return_button.classList.remove("is-loading");
      return
    }
    // User ic mismatch
    if (book.borrowed_by !== user_ic) {
      alert("Wrong borrower IC");
      submit_return_button.classList.remove("is-loading");
      return
    }
    var updateObject = {
      label: book_label,
      date_of_return: "",
      date_of_borrow: "",
      borrowed_by: "",
    }
    dbBook.updateBook(updateObject).then(() => {
      submit_return_button.classList.remove("is-loading");
      update_user(user_ic, book_label, borrow=false);
    }).catch(err => {
      alert("Error updating book");
      submit_return_button.classList.remove("is-loading");
    });
  });
  document.getElementById("return-form").reset();
}

function update_user(ic, book_label, borrow=true) {
  dbUser.getUser(ic).then(user => {
    let borrowed_books;
    let updateObject = {
      name: user.name,
      ic: ic
    }
    // Initialize array
    if (!user.borrowed_books) { 
      borrowed_books = []; 
    } else {
      borrowed_books = JSON.parse(user.borrowed_books);
    }
    if (borrow) {
      borrowed_books.push(book_label)
      updateObject.borrowing = true;
      updateObject.borrow_times = user.borrow_times + 1
    } else if (borrowed_books) {
      var index = borrowed_books.indexOf(book_label);
      // check if book is in the list of borrowed books
      if (index > -1) {
        borrowed_books.splice(index, 1);
      }
      if (!borrowed_books) {
        updateObject.borrowing = false;
      }
    }
    
    updateObject.borrowed_books = JSON.stringify(borrowed_books);
    dbUser.updateUser(updateObject).then(user => {
      alert("User and Book records updated!");
    }).catch(err => {
      alert("Error updating user.");
    })
  }).catch(err => {
    console.log(err);
    alert("Error getting user.");
  })
}
