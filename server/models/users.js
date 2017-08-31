'use strict';
/**
 * Users Model for More-recipe database
 * And its association with other models
 */

module.exports = function(sequelize, DataTypes) {
  const Users = sequelize.define('Users', {
    firstName:{
      type: DataTypes.STRING,
      allowNull:false
    },
    lastName: {
      type: DataTypes.STRING

    },
    username: {
      type:DataTypes.STRING,
  
    },
    email: {
      type:DataTypes.STRING,
      allowNull:false
    },
    password: {
      type: DataTypes.STRING
    },
    aboutMe: {
      type: DataTypes.TEXT
    },
    image: DataTypes.BLOB
  });
// One to many relationship with Recipe Model
  Users.associate = (models) => {
    Users.hasMany(models.Recipe, {
      foreignKey: 'recipeId',
      as: 'userRecipes',
    });
  }
  // one to many relationship wiht Favorites model
  Users.associate = (models) => {
    Users.hasMany(models.Favorites, {
      foreignKey: 'favoritesId',
      as: 'userFavorites',
    });
  }
  // One to many relationship with reviews Model
  Users.associate = (models) => {
    Users.hasMany(models.Reviews, {
      foreignKey: 'reviewsId',
      as: 'userReviews',
    });
  }
  return Users;
};