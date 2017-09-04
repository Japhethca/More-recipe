'use strict';

var fs        = require('fs');
var path      = require('path');
var Sequelize = require('sequelize');
var basename  = path.basename(module.filename);
// var env       = process.env.NODE_ENV || 'development';
// var config    = require(__dirname + '/../config/config.json')[env];
import dotenv from 'dotenv';

var db        = {};

let devConf = dotenv.config().parsed;

/* let devConfig = {
  'host':process.env.DB_HOST,
  'username':process.env.DB_USER,
  'password':process.env.DB_PASS,
  'dialect':process.env.DB_DIALECT,
  'database':process.env.DB_HOST
}; */


let sequelize = new Sequelize(devConf.database, devConf.username, devConf.password, devConf);


fs
  .readdirSync(__dirname)
  .filter(function(file) {
    return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
  })
  .forEach(function(file) {
    var model = sequelize['import'](path.join(__dirname, file));
    db[model.name] = model;
  });

Object.keys(db).forEach(function(modelName) {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

//Model relationship definitions
db['Users'].hasMany(db['Recipes'],{as:'usersId'});
db['Users'].hasMany(db['Favorites']);
db['Favorites'].belongsTo(db['Recipes']);
db['Votes'].belongsTo(db['Recipes']);
db['Reviews'].belongsTo(db['Recipes']);
db['Users'].hasMany(db['Reviews']); 



// db.sequelize.sync({'force':true}); 
module.exports = db;
