'use strict';
module.exports = (sequelize, DataTypes) => {
  var Recipe = sequelize.define('Recipe', {
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    descriptions: {
      type: DataTypes.TEXT
    },
    ingredients: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    directions: {
      type: DataTypes.TEXT
    },
    photos: {
      type: DataTypes.BLOB
    }
  });

  Recipe.associate = (models) => {
    Recipe.belongsTo(models.Users, {
      foreignKey: 'usersId',
      onDelete: 'CASCADE'
    });
  };

  Recipe.associate = (models) => {
    Recipe.hasMany(models.Votes, {
      foreignKey: 'votesId',
      as: 'userVotes'
    });
  };
  Recipe.associate = (models) => {
    Recipe.hasMany(models.Reviews, {
      foreignKey: 'reviewsId',
      as: 'userReviews'
    });
  };
  return Recipe;
};