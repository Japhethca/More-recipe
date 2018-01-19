

module.exports = {
  up: queryInterface => queryInterface.bulkInsert('Votes', [{
    vote: 1,
    userId: 1,
    recipeId: 1,
    createdAt: new Date(),
    updatedAt: new Date(),
  }, {
    vote: 1,
    userId: 2,
    recipeId: 1,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    vote: 0,
    userId: 1,
    recipeId: 2,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  ]),

  down: queryInterface => queryInterface.dropTable('Votes'),
};
