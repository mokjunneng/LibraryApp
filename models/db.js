const sqlite3 = require('sqlite3').verbose()

let db = new sqlite3.Database('./models/databases/libraryapp.db', (err) => {
  if (err) {
    return console.error(err.message);
  } else {
    console.log("Connected to the libraryapp database.")
  }
})

// datetime format ISO8601: YYYY-MM-DD HH:MM:SS.SSS
// list format: comma separated item in STRING
// boolean format: integer 0 or 1

// datetime columns: date_of_return, date_of_borrow
const createBookTable = "CREATE TABLE IF NOT EXISTS book \
(book_id integer PRIMARY KEY,\
title text NOT NULL,\
category text NOT NULL,\
author text NOT NULL,\
borrowed_by integer DEFAULT 0,\
date_of_return text,\
date_of_borrow text\
)"

// boolean column: access
// list column: borrowed_books
const createUserTable = "CREATE TABLE IF NOT EXISTS user \
(user_id integer PRIMARY_KEY,\
name text UNIQUE NOT NULL,\
ic text UNIQUE NOT NULL,\
borrowed_books text,\
access integer DEFAULT 1\
)"

db.run(createBookTable, [], (err) => {
  if (err) {
    return console.log(err.message)
  } else {
    console.log("book table initialized")
  }
})
db.run(createUserTable, [], (err) => {
  if (err) {
    return console.log(err.message)
  } else {
    console.log("user table initialized")
  }
})

function getBooks() {
  let sql = `SELECT * FROM book`;
  return new Promise((resolve, reject) => {
    db.all(sql, [], (err, rows) => {
      if (err){
        return reject(err);
      }
      resolve(rows);
    });
  });
}

function getBook(bookId) {
  let sql = `SELECT *
             FROM book
             WHERE book_id = ?`;
  
  return new Promise((resolve, reject) => { 
    db.get(sql, [bookId], (err, row) => {
      if (err) {
        return reject(err);
      }
      resolve(row);
    });
  });
}

function getUsers() {
  let sql = `SELECT * FROM user`;
  return new Promise((resolve, reject) => {
    db.all(sql, [], (err, rows) => {
      if (err) {
        return reject(err);
      }
      resolve(rows);
    })
  })
}

function getUser(ic) {
  let sql = `SELECT *
             FROM user
             WHERE ic = ?`;
  
  return new Promise((resolve, reject) => {
    db.get(sql, [ic], (err, row) => {
      if (err) {
        return reject(err);
      }
      resolve(row);
    });
  });
}

function updateBook(bookId, title, category, author, borrowed_by, date_of_return, date_of_borrow) {
  let sql = `UPDATE book
             SET title = ?, category = ?, author = ?, borrowed_by = ?, date_of_return = ?, date_of_borrow = ?
             WHERE book_id = ?`;
  let data = [title, category, author, borrowed_by, date_of_return, date_of_borrow, bookId];
  return new Promise((resolve, reject) => {
    db.run(sql, data, function(err) {
      if (err) {
        return console.error(err.message);
      }
      console.log(`Row updated: ${this.changes}`);
    });
  });
}

function updateUser(ic, name, borrowed_books, access) {
  let sql = `UPDATE user
             SET name = ?, borrowed_books = ?, access = ?
             WHERE ic = ?`;
  let data = [name, borrowed_books, access, ic];
  return new Promise((resolve, reject) => {
    db.run(sql, data, function(err) {
      if (err) {
        return console.error(err.message);
      }
      console.log(`Row updated: ${this.changes}`);
    });
  });
}

module.exports.db = db
module.exports.db.getBooks = getBooks; 
module.exports.db.getBook = getBook;
module.exports.db.getUsers = getUsers;
module.exports.db.getUser = getUser;
module.exports.db.updateBook = updateBook;
module.exports.db.updateUser = updateUser;


