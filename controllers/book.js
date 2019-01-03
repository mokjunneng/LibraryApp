const Book = require("../models").Book;

module.exports = {
    getBook(label) {
        return new Promise((resolve, reject) => {
            Book.findOne({
                where: {
                    label: label
                }
            }).then((book) => {
                resolve(book);
            }).catch((err) => {
                reject(err);
            });
        });  
    },
    getBooks() {
        return new Promise((resolve, reject) => {
            Book.findAll({
                raw: true
            }).then(books => {
                resolve(books);
            }).catch(err => {
                reject(err);
            });
        });
    },
    getSubsetBooks(offset, limit) {
        return new Promise((resolve, reject) => {
            Book.findAll({
                order: [
                    ["title", "ASC"]
                ],
                offset: offset,
                limit: limit,
                raw: true,
            }).then(books => {
                resolve(books);
            }).catch(err => {
                reject(err);
            });
        });
    },
    getBooksCount() {
        return new Promise((resolve, reject) => {
            Book.count().then(count => {
                resolve(count);
            }).catch(err => {
                reject(err);
            });
        });
    },
    addBook(label, title, category, author) {
        return Book.create({
            label: label,
            title: title,
            category: category,
            author: author,
        }).then(newBook => {
            console.log(`Added new book: ${newBook}`);
        }).catch(err => {
            console.log(`Error adding new book: ${err}`);
        });
    },
    removeBook(label) {
        return Book.destroy({
            where: {
                label: label
            }
        }).then(deletedBook => {
            console.log(`Deleted Book ${deletedBook}`);
        }).catch(err => {
            console.log(`Error deleting book: ${err}`);
        });
    },
    search(query) {
        return new Promise((resolve, reject) => {
            Book.search(query).then(books=> {
                resolve(books);
            }).catch(err => {
                reject(err);
            })
        });
    }
}
