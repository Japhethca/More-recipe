'use strict';

module.exports = function (sequelize, DataTypes) {
  var RecipeCategory = sequelize.define('RecipeCategory', {
    name: DataTypes.STRING
  }, {
    classMethods: {
      associate: function associate(models) {
        // associations can be defined here
      }
    }
  });
  return RecipeCategory;
};