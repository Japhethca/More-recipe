
import dotenv from 'dotenv';

const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');

const basename = path.basename(module.filename);


const db = {};

const devConf = dotenv.config().parsed;


const sequelize = new Sequelize(devConf.database, devConf.username, devConf.password, devConf);


fs
  .readdirSync(__dirname)
  .filter((file) => {
    return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
  })
  .forEach((file) => {
    const model = sequelize.import(path.join(__dirname, file));
    db[model.name] = model;
  });

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

// Model relationship definitions
db.Users.hasMany(db.Recipes, { as: 'usersId' });
db.Users.hasMany(db.Favorites);
db.Favorites.belongsTo(db.Recipes);
db.Votes.belongsTo(db.Recipes);
db.Reviews.belongsTo(db.Recipes);
db.Users.hasMany(db.Reviews);


// db.sequelize.sync({'force':true});
module.exports = db;
