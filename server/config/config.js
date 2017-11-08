// import dotenv from 'dotenv';

// dotenv.config();

module.exports = {
  development: {
    username: 'chidex',
    password: 'chidex4me',
    database: 'more-recipes',
    host: '',
    dialect: 'postgres'
  },
  test: {
    username: 'chidex',
    password: 'chidex4me',
    database: 'test',
    host: '',
    dialect: 'postgres'
    // use_env_variable: 'MORE_RECIPE_DB',
    // dialect: 'postgres'
  },
  production: {
    use_env_variable: 'DATABASE_URL',
    dialect: 'postgres'
  }
};
