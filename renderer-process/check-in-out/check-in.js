const database = require("../../models/db")

function show(p1,p2) {
  document.getElementById(p1).style.display='block';
  document.getElementById(p2).style.display='none';
  return false;
}

function bookcheck(bookid,title,place){
  database.db.getBook(bookid).then((book) => {
    try{
      document.getElementById(title).value = book["title"];
    }catch(err){
      document.getElementById(place).value = ""
      alert('No such Book ID found')
    }
  })
}
function idcheck(userid,username,place){
  database.db.getUser(userid).then((user) => {
    try{
    document.getElementById(username).value = user["name"];}
    catch(err){
      document.getElementById(place).value = ""
      alert('No such User ID found')
    }
  })
}

function update_book(){
  var book_id_value = document.getElementById('add-borrow-books').value;
  var user_id_value = document.getElementById('add-borrower-id').value;
  var day_of_ret = document.getElementById('due-day').value;
  var month_of_ret =document.getElementById('due-month').value;
  var year_of_ret = document.getElementById('due-year').value;
  var date_of_ret=new Date(`${year_of_ret}-${month_of_ret}-${day_of_ret}T23:59:59+00:00`).toISOString();
  database.db.checkExistingBook(book_id_value).then((book_exist) => {
  database.db.checkExistingUser(user_id_value).then((user_exist) => {
    if (book_exist && user_exist) {
      console.log("book exist!")
      console.log(user_exist)
      console.log(user_id_value)
      console.log(date_of_ret)
      console.log(book_id_value)
      database.db.updateBookById(book_id_value,user_id_value,date_of_ret).then(() => {
        document.getElementById('borrower-form').reset();
      })
      } else {
      console.log("No");
      }
      }).catch(err => {
      console.log(err)
      console.log("error in db")
      })
      })
      }

function update_book_ret(){
  var book_id_value = document.getElementById('add-book-return').value;
  var user_id_value = document.getElementById('add-returner-id').value;
  database.db.checkExistingBook(book_id_value).then((book_exist) => {
  database.db.checkExistingUser(user_id_value).then((user_exist) => {
    if (book_exist === "Book Exists!" && user_exist === "User Exists!") {
      database.db.updateBookByIdWoDate(book_id_value,user_id_value).then(() => {
        document.getElementById('return-form').reset();
      })
    } else {
      console.log("No");
    }
  }).catch(err => {
    console.log(err)
    console.log("error in db")
  })
})
}
var shown = document.getElementById("return-button");
shown.addEventListener("click", ()=> { show("Page2","Page1") });

var shown_one = document.getElementById("borrow-button");
shown_one.addEventListener("click", ()=> { show("Page1","Page2") });

var book_id = document.getElementById('add-borrow-books')
book_id.addEventListener("blur", ()=> {
  var book_id_value = document.getElementById('add-borrow-books').value;
  bookcheck(book_id_value,'read-book-title','add-borrow-books');
});

var borrower_id = document.getElementById('add-borrower-id')
borrower_id.addEventListener("blur", ()=> {
var borrower_id_value = document.getElementById('add-borrower-id').value;
  idcheck(borrower_id_value,'read-borrower-name','add-borrower-id');
});

var enter_form = document.getElementById('submit-borrow');
enter_form.addEventListener('click', ()=> {
  update_book()
});

var book_return = document.getElementById('add-book-return')
book_return.addEventListener("blur", ()=> {
var book_return_value = document.getElementById('add-book-return').value;
 bookcheck(book_return_value,'read-return-title','add-book-return')
});

var borrower_id = document.getElementById('add-returner-id')
borrower_id.addEventListener("blur", ()=> {
var borrower_id_value = document.getElementById('add-returner-id').value;
  idcheck(borrower_id_value,'read-returner-name','add-returner-id');
});

var enter_form = document.getElementById('submit-return');
enter_form.addEventListener('click', ()=> {
  update_book_ret()
});
