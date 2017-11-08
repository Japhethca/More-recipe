

module.exports = (sequelize, DataTypes) => {
  const Favorites = sequelize.define('Favorites', {
    userId: {
      type: DataTypes.INTEGER,
    },
    recipeId: {
      type: DataTypes.INTEGER,
    },
  });
  Favorites.associate = (models) => {
    Favorites.belongsTo(models.Recipes, {
      foreignKey: 'recipeId',
      onDelete: 'CASCADE',
    });
    Favorites.belongsTo(models.Users, {
      foreignKey: 'userId',
    });
  };
  return Favorites;
};
