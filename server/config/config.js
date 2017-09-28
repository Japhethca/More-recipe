
module.exports = {
  development: {
    username: 'chidex',
    password: 'chidex4me',
    database: 'new',
    host: '',
    dialect: 'postgres'
  },
  test: {
    username: 'chidex',
    password: 'chidex4me',
    database: 'test',
    host: '',
    dialect: 'postgres'
  },
  production: {
    use_env_variable: 'DATABASE_URL',
    dialect: 'postgres'
  }
};
