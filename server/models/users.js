

module.exports = (sequelize, DataTypes) => {
  const Users = sequelize.define('Users', {
    firstname: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    lastname: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    aboutme: {
      type: DataTypes.STRING,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      isEmail: true
    },
    photo: {
      type: DataTypes.STRING,
    },

  });
  Users.associate = (models) => {
    Users.hasMany(models.Recipes, {
      foreignKey: 'userId',
      as: 'recipe',
    });
    Users.hasMany(models.Reviews, {
      foreignKey: 'userId',
      as: 'reviews',
    });
    Users.hasMany(models.Favorites, {
      foreignKey: 'userId',
      as: 'favorites',
    });
    Users.hasMany(models.Votes, {
      foreignKey: 'userId',
      as: 'votes',
    });
  };
  return Users;
};
