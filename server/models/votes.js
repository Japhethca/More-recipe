

module.exports = function (sequelize, DataTypes) {
  let Votes = sequelize.define('Votes', {
    upVotes: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    downVotes: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    RecipeId: {
      type: DataTypes.INTEGER,
    },
  });
  return Votes;
};
