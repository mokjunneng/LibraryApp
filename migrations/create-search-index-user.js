'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    var sequelize = queryInterface.sequelize,
        searchFields = ['name', 'ic'],
        vectorName = "UserText",
        tableName = "Users";

    return sequelize
      .query('ALTER TABLE "' + tableName + '" ADD COLUMN "' + vectorName + '" TSVECTOR')
      .then(function() {
        console.log("Column added: Adding updating values")
        return sequelize
                .query('UPDATE "' + tableName + '" SET "' + vectorName + '" = to_tsvector(\'english\', ' + searchFields.join(' || \' \' || ') + ')')
                .catch(console.log);
      }).then(function() {
        console.log("Values added: Creating Index")
        return sequelize
                .query('CREATE INDEX user_search_idx ON "' + tableName + '" USING gin("' + vectorName + '");')
                .catch(console.log);
      }).then(function() {
        console.log("Index created: Adding trigger");
        return sequelize
                .query('CREATE TRIGGER user_vector_update BEFORE INSERT OR UPDATE ON "' + tableName + '" FOR EACH ROW EXECUTE PROCEDURE tsvector_update_trigger("' + vectorName + '", \'pg_catalog.english\', ' + searchFields.join(', ') + ')')
                .catch(console.log);
      }).then(function() {
        console.log("Everything worked!")
      }).catch(console.log);
  },

  down: function (queryInterface, Sequelize) {
    var sequelize = queryInterface.sequelize,
        searchFields = ['name', 'ic'],
        vectorName = "UserText",
        tableName = "Users";
        
    return sequelize
      .query('DROP TRIGGER user_vector_update ON "' + tableName + '"')
      .then(function(){
        console.log("removed trigger")
        return sequelize
                .query("DROP INDEX user_search_idx")
                .catch(console.log)
      }).then(function(){
        console.log("removed index")
        return sequelize
                .query('ALTER TABLE "' + tableName + '" DROP COLUMN "' + vectorName + '"')
                .catch(console.log)
      }).then(function(){
        console.log("removed column")
      }).catch(console.log)
  }
};