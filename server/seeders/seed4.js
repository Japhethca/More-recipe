

module.exports = {
  up: queryInterface => queryInterface.bulkInsert('Favorites', [{
    id: 1,
    userId: 1,
    recipeId: 1,
    createdAt: new Date(),
    updatedAt: new Date(),
  }, {
    id: 2,
    userId: 2,
    recipeId: 2,
    createdAt: new Date(),
    updatedAt: new Date(),
  }]),

  down: queryInterface => queryInterface.dropTable('Favorites'),
};
