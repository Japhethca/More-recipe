'use strict';
/**
 * Votes Model for More-recipe database
 * And its association with other models
 */

module.exports = (sequelize, DataTypes) => {
  var Votes = sequelize.define('Votes', {
    upVotes: {
      type: DataTypes.INTEGER
    },
    downVotes: {
      type: DataTypes.INTEGER
    }
  });
// One to one relationship with Recipe model
  Votes.associate = (models) => {
    Votes.belongsTo(models.Recipe, {
      foreignKey: 'recipeId',
      onDelete: 'CASCADE',
    });
  }
  return Votes;
};