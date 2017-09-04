'use strict';
module.exports = function(sequelize, DataTypes) {
  var Votes = sequelize.define('Votes', {
    upVotes: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    },
    downVotes: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    }, 
    RecipeId: {
      type: DataTypes.INTEGER
    }
  });
  return Votes;
};