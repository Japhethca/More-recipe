import _ from 'lodash';
/**
 * @description schema for recipes model
 * @param {object} sequelize - sequelize instance
 * @param {object} DataTypes - Datatype instance
 * @returns {object} - Database Object
 */
module.exports = (sequelize, DataTypes) => {
  const Recipes = sequelize.define('Recipes', {
    name: {
      type: DataTypes.TEXT,
      allowNull: false,
      set(value) {
        this.setDataValue('name', _.capitalize(value));
      },
      get() {
        return _.capitalize(this.getDataValue('name'));
      }
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
      get() {
        return _.capitalize(this.getDataValue('description'));
      }
    },
    ingredients: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    direction: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    image: {
      type: DataTypes.STRING,
    },
    upvotes: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    views: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    downvotes: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    userId: {
      type: DataTypes.INTEGER,
    }
  });
  Recipes.associate = (models) => {
    Recipes.belongsTo(models.Users, {
      foreignKey: 'userId',
      as: 'author'
    });
    Recipes.hasMany(models.Reviews, {
      foreignKey: 'recipeId',
    });
    Recipes.hasMany(models.Favorites, {
      foreignKey: 'recipeId',
      as: 'favorites',
    });
    Recipes.hasMany(models.Votes, {
      foreignKey: 'recipeId',
      as: 'votes',
    });
  };
  return Recipes;
};
