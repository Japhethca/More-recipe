'use strict';

module.exports = {
  development: {
    username: 'chidex',
    password: 'chidex4me',
    database: 'more-recipes',
    host: '',
    dialect: 'postgres'
  },
  test: {
    use_env_variable: 'TEST_DB',
    dialect: 'postgres'
  },
  production: {
    use_env_variable: 'DATABASE_URL',
    dialect: 'postgres'
  }
};