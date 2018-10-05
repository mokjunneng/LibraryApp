module.exports = (sequelize, Sequelize) => {
  return sequelize.define('user', {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    name: Sequelize.STRING,
    access: Sequelize.BOOLEAN,
    ic: Sequelize.STRING,
    borrowed_books: Sequelize.JSON
  })
}
