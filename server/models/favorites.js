

module.exports = (sequelize, DataTypes) => {
  let Favorites = sequelize.define('Favorites', {
    favorite: {
      type: DataTypes.STRING,
    },
    UserId: {
      type: DataTypes.INTEGER,
    },
    RecipeId: {
      type: DataTypes.INTEGER,
    },
  });

  return Favorites;
};
