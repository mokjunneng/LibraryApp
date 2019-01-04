'use strict';
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    name: { type: DataTypes.STRING, allowNull: false },
    ic: { type: DataTypes.STRING, allowNull: false, unique: true },
    access: { type: DataTypes.BOOLEAN, defaultValue: true },
    borrow_times: { type: DataTypes.INTEGER, defaultValue: 0 },
    borrowed_books: { type: DataTypes.STRING, defaultValue: "" },
    last_seen: DataTypes.STRING
  });

  User.getSearchVector = function() {
    return 'UserText';
  };

  User.search = (query) => {
    if(sequelize.options.dialect !== 'postgres') {
      console.log('Search is only implemented on POSTGRES database');
      return;
    }

    query = sequelize.getQueryInterface().escape(query);
    console.log(query);
    
    return sequelize
            .query('SELECT * FROM "' + "Users" + '" WHERE "' + "UserText" + '" @@ plainto_tsquery(\'english\', ' + query + ')', User);
  }
  
  // User.associate = function(models) {
  //   User.hasMany(models.Book, {
  //     foreignKey: "book_id",
  //     as: "borrowed_books"
  //   });
  // };
  return User
};