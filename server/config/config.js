const dotenv = require('dotenv');

dotenv.config();

module.exports = {
  development: {
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DEV_DB,
    host: '',
    dialect: process.env.DB_DIALECT
  },
  test: {
    // username: process.env.DB_USERNAME,
    // password: process.env.DB_PASSWORD,
    // database: process.env.TEST_DB,
    // host: '',
    // dialect: process.env.DB_DIALECT
    use_env_variable: 'MORE_RECIPE_DB',
    dialect: 'postgres'
  },
  production: {
    use_env_variable: 'DATABASE_URL',
    dialect: 'postgres'
  }
};
