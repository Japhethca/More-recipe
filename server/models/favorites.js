'use strict';
/**
 * Fovorites Model for More-recipe database
 * And its association with other models
 */

module.exports = (sequelize, DataTypes) => {
  const Favorites = sequelize.define('Favorites', {});

// many to one relationship with Users Model
  Favorites.associate = (models) => {
    Favorites.belongsTo(models.Users, {
      foreignKey: 'usersId',
      onDelete: 'CASCADE',
    });
  };

// many to one relationship with Recipe model
  Favorites.associate = (models) => {
    Favorites.belongsTo(models.Recipe, {
      foreignKey: 'recipeId',
      onDelete: 'CASCADE',
    });
  };

  return Favorites;
};

