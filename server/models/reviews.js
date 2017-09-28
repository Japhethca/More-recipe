

module.exports = (sequelize, DataTypes) => {
  const Reviews = sequelize.define('Reviews', {
    title: {
      type: DataTypes.STRING,
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    recipeId: {
      type: DataTypes.INTEGER,
    },
    userId: {
      type: DataTypes.INTEGER,
    },

  });
  Reviews.associate = (models) => {
    Reviews.belongsTo(models.Recipes, {
      foreignKey: 'recipeId',
      onDelete: 'CASCADE',
    });
    Reviews.belongsTo(models.Users, {
      foreignKey: 'userId',
    });
  };
  return Reviews;
};
