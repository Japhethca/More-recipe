'use strict';

var _dotenv = require('dotenv');

var _dotenv2 = _interopRequireDefault(_dotenv);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var fs = require('fs');
var path = require('path');
var Sequelize = require('sequelize');

var basename = path.basename(module.filename);

var db = {};

var devConf = _dotenv2.default.config().parsed;

var sequelize = new Sequelize(devConf.DB, devConf.DB_USER, devConf.DB_PASS, devConf);

fs.readdirSync(__dirname).filter(function (file) {
  return file.indexOf('.') !== 0 && file !== basename && file.slice(-3) === '.js';
}).forEach(function (file) {
  var model = sequelize.import(path.join(__dirname, file));
  db[model.name] = model;
});

Object.keys(db).forEach(function (modelName) {
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
db.Users.hasMany(db.Votes);

// db.sequelize.sync();
module.exports = db;