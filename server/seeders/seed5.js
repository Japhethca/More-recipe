

module.exports = {
  up: queryInterface => queryInterface.bulkInsert('Votes', [{
    id: 1,
    vote: 1,
    userId: 1,
    recipeId: 1,
    createdAt: new Date(),
    updatedAt: new Date(),
  }, {
    id: 2,
    vote: 1,
    userId: 2,
    recipeId: 1,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 3,
    vote: 0,
    userId: 1,
    recipeId: 2,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  ]),

  down: queryInterface => queryInterface.dropTable('Votes'),
};
