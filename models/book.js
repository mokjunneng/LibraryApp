module.exports = (sequelize, Sequelize) => {
  return sequelize.define('book', {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    title: Sequelize.STRING,
    category: Sequelize.STRING,
    author: Sequelize.STRING,
    date_of_borrow: Sequelize.DATE,
    date_of_return: Sequelize.DATE,
    borrowed: {
      type:Sequelize.BOOLEAN
      defaultValue: false,
    },
  })
}
