'use strict';
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    name: { type: DataTypes.STRING, allowNull: false },
    ic: { type: DataTypes.STRING, allowNull: false, unique: true },
    access: { type: DataTypes.BOOLEAN, defaultValue: true },
    borrow_times: DataTypes.INTEGER,
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

      // getSearchVector: function() {
      //     return 'UserText';
      // },

      // addFullTextIndex: function() {

      //     if(sequelize.options.dialect !== 'postgres') {
      //         console.log('Not creating search index, must be using POSTGRES to do this');
      //         return;
      //     }

      //     var searchFields = ['name', 'ic'];
      //     var User = this;

      //     var vectorName = User.getSearchVector();
      //     sequelize
      //         .query('ALTER TABLE "' + User.tableName + '" ADD COLUMN "' + vectorName + '" TSVECTOR')
      //         .success(function() {
      //             return sequelize
      //                     .query('UPDATE "' + User.tableName + '" SET "' + vectorName + '" = to_tsvector(\'english\', ' + searchFields.join(' || \' \' || ') + ')')
      //                     .error(console.log);
      //         }).success(function() {
      //             return sequelize
      //                     .query('CREATE INDEX user_search_idx ON "' + User.tableName + '" USING gin("' + vectorName + '");')
      //                     .error(console.log);
      //         }).success(function() {
      //             return sequelize
      //                     .query('CREATE TRIGGER user_vector_update BEFORE INSERT OR UPDATE ON "' + Post.tableName + '" FOR EACH ROW EXECUTE PROCEDURE tsvector_update_trigger("' + vectorName + '", \'pg_catalog.english\', ' + searchFields.join(', ') + ')')
      //                     .error(console.log);
      //         }).error(console.log);

      // },

  
  // User.associate = function(models) {
  //   User.hasMany(models.Book, {
  //     foreignKey: "book_id",
  //     as: "borrowed_books"
  //   });
  // };
  return User
};