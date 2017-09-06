

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
    views: {
      type: DataTypes.INTEGER
    },
    RecipeId: {
      type: DataTypes.INTEGER,
    },
  });
  return Votes;
};
