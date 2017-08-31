'use strict';
/**
 * Reviews Model for More-recipe database
 * And its association with other models
 */

module.exports = (sequelize, DataTypes) => {
  const Reviews = sequelize.define('Reviews', {
    content: {
      type:DataTypes.TEXT,
      allowNull:false
      }
  });
// Many to one relationship with Recipe model
   Reviews.associate = (models) => {
    Reviews.belongsTo(models.Recipe, {
      foreignKey: 'recipeId',
      onDelete: 'CASCADE',
    });
  }

  Reviews.associate = (models) => {
    Reviews.belongsTo(models.Users, {
      foreignKey: 'usersId',
    });
  }
  return Reviews;
};