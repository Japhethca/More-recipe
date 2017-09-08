

module.exports = function (sequelize, DataTypes) {
  const Votes = sequelize.define('Votes', {

    vote: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    RecipeId: {
      type: DataTypes.INTEGER,
    },
    UserId: {
      type: DataTypes.INTEGER,
    },

  });
  return Votes;
};
