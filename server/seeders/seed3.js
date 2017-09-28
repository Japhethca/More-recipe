

module.exports = {
  up: queryInterface => queryInterface.bulkInsert('Reviews', [{
    id: 1,
    title: 'This makes sense',
    content: 'Really like this is recipe, looking forward to more',
    userId: 1,
    recipeId: 1,
    createdAt: new Date(),
    updatedAt: new Date(),
  }, {
    id: 2,
    title: 'Wow, awesome recipe',
    content: 'I really like this is recipe, looking forward to more',
    userId: 2,
    recipeId: 2,
    createdAt: new Date(),
    updatedAt: new Date(),
  }]),

  down: queryInterface => queryInterface.dropTable('Reviews'),
};
