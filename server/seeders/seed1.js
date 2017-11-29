const bcrypt = require('bcrypt');

const saltRound = 10;

module.exports = {
  up: queryInterface => queryInterface.bulkInsert('Users', [{
    firstname: 'Ngozi',
    lastname: 'nwali',
    email: 'ngozinwali@gmail.com',
    password: bcrypt.hashSync('ngobest', saltRound),
    username: 'ngobest',
    aboutme: 'just a cool person',
    photo: null,
    createdAt: new Date(),
    updatedAt: new Date(),
  }, {
    firstname: 'kelechi',
    lastname: 'Anyigor',
    email: 'kelechi@gmail.com',
    password: bcrypt.hashSync('kelechi', saltRound),
    username: 'kelechi',
    aboutme: '',
    photo: null,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    firstname: 'benjamin',
    lastname: 'Anyigor',
    email: 'ben10@gmail.com',
    password: bcrypt.hashSync('ben10', saltRound),
    username: 'ben10',
    aboutme: '',
    photo: null,
    createdAt: new Date(),
    updatedAt: new Date(),
  }
  ]),

  down: queryInterface => queryInterface.dropTable('Users'),
};
