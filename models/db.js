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

// consider setting a deleted column
const createBookTable = "CREATE TABLE IF NOT EXISTS book \
(book_id integer NOT NULL PRIMARY KEY,\
book_label text NOT NULL,\
title text NOT NULL,\
category text NOT NULL,\
author text NOT NULL,\
borrowed_by integer DEFAULT 0,\
date_of_entry text NOT NULL,\
date_of_return text,\
date_of_borrow text\
)"

// boolean column: access
// list column: borrowed_books
const createUserTable = "CREATE TABLE IF NOT EXISTS user \
(user_id integer NOT NULL PRIMARY KEY,\
name text UNIQUE NOT NULL,\
ic text UNIQUE NOT NULL,\
borrowed_books text,\
access integer DEFAULT 1,\
borrow_times integer DEFAULT 0,\
last_seen text,\
date_of_entry text\
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

// Can factorize all the error functions out

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

function getBook(book_label) {
  let sql = `SELECT *
             FROM book
             WHERE book_label = ?`;

  return new Promise((resolve, reject) => {
    db.get(sql, [book_label], (err, row) => {
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
};

function addUser(name, ic) {
  let sql = `INSERT INTO user
  (name, ic, date_of_entry)
  VALUES (?, ?, datetime("now"))`
  return new Promise((resolve, reject) => {
    db.run(sql, [name, ic], function(err) {
      if (err) {
        return reject(err);
      }
      resolve("done");
    });
  });
};

function addBook(book_label, title, category, author) {
 let sql = `INSERT INTO book
 (book_label, title, category, author, date_of_entry)
 VALUES (?, ?, ?, ?, datetime("now"))`
 let data = [book_label, title, category, author];
 console.log(data);
 return new Promise((resolve, reject) => {
   db.run(sql, data, function(err) {
     if (err) {
       return reject(err);
     }
     resolve("done");
   });
 });
};

function removeUser(ic) {
  let sql = `DELETE FROM user WHERE ic=?`
  return new Promise((resolve, reject) => {
    db.run(sql, [ic], function(err) {
      if (err) {
        return console.error(err.message);
      };
      console.log(`Deleted user with ic: ${ic}`);
    });
  });
};

function removeBook(book_label) {
  let sql = `DELETE FROM book WHERE book_label=?`
  return new Promise((resolve, reject) => {
    db.run(sql, [book_label], function(err) {
      if (err) {
        return console.error(err.message);
      };
      console.log(`Deleted book with book label: ${book_label}`);
    });
  });
};

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

module.exports = {
  getBooks: getBooks,
  getBook: getBook,
  getUsers: getUsers,
  getUser: getUser,
  addUser: addUser,
  addBook: addBook,
  updateBook: updateBook,
  updateUser: updateUser,
  removeUser: removeUser,
  removeBook: removeBook
}
