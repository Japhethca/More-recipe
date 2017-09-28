

module.exports = {
  up: queryInterface => queryInterface.bulkInsert('Users', [{
    id: 1,
    firstname: 'Ngozi',
    lastname: 'nwali',
    email: 'ngozinwali@gmail.com',
    password: 'ngobest',
    username: 'ngobest',
    aboutme: 'just a cool person',
    photo: null,
    createdAt: new Date(),
    updatedAt: new Date(),
  }, {
    id: 2,
    firstname: 'kelechi',
    lastname: 'Anyigor',
    email: 'kelechi@gmail.com',
    password: 'kelechi',
    username: 'kelechi',
    aboutme: '',
    photo: null,
    createdAt: new Date(),
    updatedAt: new Date(),
  }]),

  down: queryInterface => queryInterface.dropTable('Users'),
};
