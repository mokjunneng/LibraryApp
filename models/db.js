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

module.exports.db = db
