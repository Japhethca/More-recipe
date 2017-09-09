
let fs = require('fs');
let path = require('path');
let Sequelize = require('sequelize');

let basename = path.basename(module.filename);
let env = process.env.NODE_ENV || 'development';
let config = require(`${__dirname}/../config/config.js`)[env];
let db = {};

let sequelize;

if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable]);
} else {
  sequelize = new Sequelize(config.database, config.username, config.password, config);
}


fs
  .readdirSync(__dirname)
  .filter(file => (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js'))
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
db.Reviews.belongsTo(db.Users);
db.Recipes.hasMany(db.Reviews);
db.Users.hasMany(db.Votes);

// db.sequelize.sync({ force: true });
export default db;
