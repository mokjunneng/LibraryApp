'use strict';

const fs        = require('fs');
const path      = require('path');
const Sequelize = require('sequelize');
const basename  = path.basename(module.filename);
const env       = 'development';
const config    = require(__dirname + '/config')[env];
const db        = {};

// import Models
const BookModel = require('./book')
const UserModel = require('./user')

const sequelize = new Sequelize(config.database, config.username, config.password, config);

// fs
//   .readdirSync(__dirname)
//   .filter((file) => {
//     return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
//   })
//   .forEach((file) => {
//     const model = sequelize['import'](path.join(__dirname, file));
//     db[model.name] = model;
//   });
//
// Object.keys(db).forEach((modelName) => {
//   if (db[modelName].associate) {
//     db[modelName].associate(db);
//   }
// });

// authenticate connection to database
sequelize
		.authenticate()
		.then(() => {
			console.log('Connection has been established successfully.');
		})
		.catch((err) => {
			console.log('Unable to connect to the database:', err);
		});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

const Book = BookModel(sequelize, Sequelize)
const User = UserModel(sequelize, Sequelize)
// track relationship between Book and User Models
// each User can have multiple books and each Book can only have one user
const BookUser = sequelize.define('book_user', {})

User.hasMany(Book)

sequelize.sync()
  .then(() => {
    console.log('Database and Tables created!')
  })

db.book = Book
db.user = User

module.exports = db
