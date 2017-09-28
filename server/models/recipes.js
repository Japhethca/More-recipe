

module.exports = (sequelize, DataTypes) => {
  let Recipes = sequelize.define('Recipes', {
    name: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
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
    });
    Recipes.hasMany(models.Reviews, {
      foreignKey: 'recipeId',
      as: 'reviews',
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
