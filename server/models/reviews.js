

module.exports = function (sequelize, DataTypes) {
  const Reviews = sequelize.define('Reviews', {
    title: {
      type: DataTypes.STRING,
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    RecipeId: {
      type: DataTypes.INTEGER,
    },
    UserId: {
      type: DataTypes.INTEGER,
    },

  });
  return Reviews;
};
