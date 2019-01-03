'use strict';
module.exports = (sequelize, DataTypes) => {
  const Book = sequelize.define('Book', {
    label: { type: DataTypes.STRING, allowNull: false, unique: true },
    title: { type: DataTypes.STRING, allowNull: false },
    category: { type: DataTypes.STRING, allowNull: false },
    author: { type: DataTypes.STRING, allowNull: false },
    borrowed_by: DataTypes.INTEGER,
    date_of_return: DataTypes.STRING,
    date_of_borrow: DataTypes.STRING
  });
  Book.getSearchVector = function() {
    return 'BookText';
  };

  Book.search = (query) => {
    if(sequelize.options.dialect !== 'postgres') {
      console.log('Search is only implemented on POSTGRES database');
      return;
    }

    query = sequelize.getQueryInterface().escape(query);
    console.log(query);
    
    return sequelize
            .query('SELECT * FROM "' + "Books" + '" WHERE "' + "BookText" + '" @@ plainto_tsquery(\'english\', ' + query + ')', Book);
  }
  // Book.associate = function(models) {
  //   Book.belongsTo(models.User, {
  //     foreignKey: "id"
  //   });
  // };
  return Book;
};