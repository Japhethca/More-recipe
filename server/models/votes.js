
/**
 * @param {object} sequelize - sequelize instance
 * @param {object} DataTypes - Datatype instance
 * @returns {object} - Database Object
 */
module.exports = (sequelize, DataTypes) => {
  const Votes = sequelize.define('Votes', {
    vote: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    recipeId: {
      type: DataTypes.INTEGER,
    },
    userId: {
      type: DataTypes.INTEGER,
    },
  });
  Votes.associate = (models) => {
    Votes.belongsTo(models.Recipes, {
      foreignKey: 'recipeId',
    });
    Votes.belongsTo(models.Users, {
      foreignKey: 'userId',
    });
  };
  return Votes;
};
