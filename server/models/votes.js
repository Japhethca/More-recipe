

module.exports = function (sequelize, DataTypes) {
  const Votes = sequelize.define('Votes', {

    votes: {
      type: DataTypes.INTEGER,
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
