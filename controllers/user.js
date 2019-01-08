const User = require("../models").User

module.exports = {
    getUser(ic) {
        return new Promise((resolve, reject) => {
            User.findOne({
                where: {
                    ic: ic
                },
                raw: true,
            }).then((user) => {
                resolve(user);
            }).catch((err) => {
                reject(err);
            });
        });
    },
    getAllUsers() {
        return new Promise((resolve, reject) => {
            User.findAll().then((users) => {
                resolve(users.get({ plain: true }));
            }).catch((err) => {
                reject(err);
            });
        })
    },
    getSubsetUsers(offset, limit) {
        return new Promise((resolve, reject) => {
            User.findAll({
                order: [
                    ["name", "ASC"]
                ],
                offset: offset,
                limit: limit,
                raw: true,
            }).then(users => {
                resolve(users);
            }).catch(err => {
                reject(err);
            });
        });
    },
    getSubsetBorrowingUsers(offset, limit) {
        return new Promise((resolve, reject) => {
            User.findAll({
                where: {
                    borrowing: true
                },
                offset: offset,
                limit: limit,
                raw: true
            }).then(users => {
                resolve(users);
            }).catch(err => {
                reject(err);
            });
        })
    },
    getUsersCount() {
        return new Promise((resolve, reject) => {
            User.count().then(count => {
                resolve(count);
            }).catch(err => {
                reject(err);
            });
        });
    },
    getBorrowingUsersCount() {
        return new Promise((resolve, reject) => {
            User.count({ where : { borrowing: true } }).then(count => {
                resolve(count);
            }).catch(err => {
                reject(err);
            });
        });
    },
    addUser(name, ic) {
        return User.create({
            name: name,
            ic: ic,
        }).then(newUser => {
            console.log(`Added new user : ${newUser}`);
        }).catch(err => {
            console.log(`Error adding user of name:${name}, ic:${ic} : ${err}`);
        });
    },
    removeUser(ic) {
        return User.destroy({
            where: {
                ic: ic
            }
        }).then(deletedUser => {
            console.log(`Deleted User: ${deletedUser}`);
        }).catch(err => {
            console.log(`Error deleting user with ic ${ic} : ${err}`);
        });
    },
    updateUser(updateObject) {
        return new Promise((resolve, reject) => {
            User.update(updateObject, 
                {
                    fields: ["borrowed_books", "borrow_times", "borrowing"],
                    where: {
                        name: updateObject.name,
                        ic: updateObject.ic,
                    }
                }
            ).then((user) => {
                resolve(user)
                console.log(`Updated user: ${user}`);                
            }).catch((err) => {
                reject(err)
            });
        });
    },
    search(query) {
        return new Promise((resolve, reject) => {
            User.search(query).then(users=> {
                resolve(users);
            }).catch(err => {
                reject(err);
            })
        });
    }
}