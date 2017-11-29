

module.exports = {
  up: queryInterface => queryInterface.bulkInsert('Recipes', [{
    name: 'Egusi Soup Recipe',
    description: 'this is an african soup',
    ingredients: 'maggi',
    direction: 'first do that then the other',
    image: null,
    upvotes: 2,
    downvotes: 0,
    userId: 1,
    createdAt: new Date(),
    updatedAt: new Date(),
  }, {
    name: 'Puonded yam',
    description: 'pounded yam is great',
    ingredients: 'yam',
    direction: 'first cook the yam',
    image: null,
    upvotes: 0,
    downvotes: 1,
    userId: 2,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    name: 'sausage yam',
    description: 'this is an awesome recipe',
    ingredients: 'sausage',
    direction: 'i have no idea how to do this',
    image: null,
    upvotes: 0,
    downvotes: 0,
    userId: 2,
    createdAt: new Date(),
    updatedAt: new Date(),
  }]),

  down: queryInterface => queryInterface.dropTable('Recipes'),
};
