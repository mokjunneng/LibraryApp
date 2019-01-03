'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false
      },
      ic: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
      },
      borrowed_books: {
        type: Sequelize.STRING
      },
      access: {
        type: Sequelize.BOOLEAN,
        defaultValue: true
      },
      borrow_times: {
        type: Sequelize.INTEGER
      },
      last_seen: {
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Users');
  }
};