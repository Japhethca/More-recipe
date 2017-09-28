
module.exports = {
  development: {
    username: 'chidex',
    password: 'chidex4me',
    database: 'test',
    host: '',
    dialect: 'postgres'
  },
  test: {
    use_env_variable: 'MORE_RECIPE_DB',
    dialect: 'postgres'
  },
  production: {
    use_env_variable: 'DATABASE_URL',
    dialect: 'postgres'
  }
};
