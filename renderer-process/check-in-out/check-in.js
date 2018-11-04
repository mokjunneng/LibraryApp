const database = require("../../models/db")

function show(p1,p2) {
  document.getElementById(p1).style.display='block';
  document.getElementById(p2).style.display='none';
  return false;
}

var book_checked;
function bookcheck(bookid){
  database.db.getBook(bookid).then((book) => {
    book_checked = book;
    document.getElementById("read-book-title").value = book["title"];
  })
  console.log(book_checked["title"])
}
// var book_checked;
// function idcheck(bookid){
//   database.db.getBook(bookid).then((book) => {
//     book_checked = book;
//     document.getElementById("read-book-title").value = book["title"];
//   })
//   console.log(book_checked["title"])
// }

function update_user(){
  var book_id_value = document.getElementById('add-borrow-books').value;
  var user_id_value = document.getElementById('add-borrower-id').value;
  var day_of_ret = document.getElementById('due-day').value;
  var month_of_re t =document.getElementById('due-month').value;
  var year_of_ret = document.getElementById('due-year').value;
  console.log(`${year_of_ret}-${month_of_ret}-${day_of_ret}`)
  // var date_of_ret=new Date(`${year_of_ret}-${month_of_ret}-${day_of_ret}`).toISOString();
  // database.db.updateBookById(book_id_value,user_id_value,date_of_ret).then =>
  // {book_checked}
  // console.log(date_of_ret)

}

var shown = document.getElementById("return-button");
shown.addEventListener("click", ()=> { show("Page2","Page1") });

var shown_one = document.getElementById("borrow-button");
shown_one.addEventListener("click", ()=> { show("Page1","Page2") });

var book_id = document.getElementById('add-borrow-books')
book_id.addEventListener("blur", ()=> {
  var book_id_value = document.getElementById('add-borrow-books').value;
  bookcheck(book_id_value);
});
// var borrower_id = document.getElementById('add-borrower-id')
// borrower_id.addEventListener("blur", ()=> {
// var borrower_id_value = document.getElementById('add-borrow-books').value;
//   idcheck(borrower_id_value);
// });
var enter_form = document.getElementById('submit-borrow');
enter_form.addEventListener('click', ()=> {
  console.log("button event listener")
  update_user()
})
//
//
// var borrower_id= document.getElementById('add-borrower-id');
// if getuser(ic)
//
// if getBook(book_id)=== & getuser(ic)=== {
//   updatebook()
// }
//
// database.db.getbook
