import _ from 'lodash';
import bcrypt from 'bcrypt';

const saltRound = 10;

/**
 * @param {object} sequelize - sequelize instance
 * @param {object} DataTypes - Datatype instance
 * @returns {object} - Database Object
 */
module.exports = (sequelize, DataTypes) => {
  const Users = sequelize.define('Users', {
    firstname: {
      type: DataTypes.STRING,
      set(value) {
        this.setDataValue('firstname', _.capitalize(value));
      }
    },
    lastname: {
      type: DataTypes.STRING,
      set(value) {
        this.setDataValue('lastname', _.capitalize(value));
      }
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      set(value) {
        this.setDataValue('password', bcrypt.hashSync(value, saltRound));
      }
    },
    aboutme: {
      type: DataTypes.STRING,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      isEmail: true,
      unique: true,
      set(value) {
        this.setDataValue('email', value.toLowerCase());
      }
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
