const Book = require("../models").Book;

module.exports = {
    getBook(label) {
        return new Promise((resolve, reject) => {
            Book.findOne({
                where: {
                    label: label
                },
                raw: true,
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
        return new Promise((resolve, reject) => {
            Book.create({
                label: label,
                title: title,
                category: category,
                author: author,
            }).then(() => {
                resolve();
            }).catch(err => {
                reject(err);
            });
        });
    },
    removeBook(label) {
        return new Promise((resolve, reject) => {
            Book.destroy({
                where: {
                    label: label
                }
            }).then(deletedBook => {
                resolve();
                console.log(`Deleted Book ${deletedBook}`);
            }).catch(err => {
                reject();
                console.log(`Error deleting book: ${err}`);
            });
        });
    },
    updateBook(updateObject) {
        return new Promise((resolve, reject) => { 
            Book.update(updateObject, 
                {
                    fields: ['borrowed_by', 'date_of_return', 'date_of_borrow'],
                    where: {
                        label: updateObject.label,
                    }
                }).then((book) => {
                    resolve(book)
                    console.log(`Updated book: ${book}`);
                }).catch(err => {
                    reject(err);
                });
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
