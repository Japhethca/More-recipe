'use strict';

module.exports = function (sequelize, DataTypes) {
  var Votes = sequelize.define('Votes', {

    vote: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    RecipeId: {
      type: DataTypes.INTEGER
    },
    UserId: {
      type: DataTypes.INTEGER
    }

  });
  return Votes;
};