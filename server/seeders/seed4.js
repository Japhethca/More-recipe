

module.exports = {
  up: queryInterface => queryInterface.bulkInsert('Favorites', [{
    userId: 1,
    recipeId: 1,
    createdAt: new Date(),
    updatedAt: new Date(),
  }, {
    userId: 2,
    recipeId: 2,
    createdAt: new Date(),
    updatedAt: new Date(),
  }]),

  down: queryInterface => queryInterface.dropTable('Favorites'),
};
