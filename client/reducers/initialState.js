export default {
  profile: {},
  results: [],
  auth: {
    isAuthenticated: false,
    user: {},
    errors: ''
  },
  recipeReducer: {
    recipes: [],
    userRecipes: [],
    favorites: [],
    recipe: {
      name: '',
      description: '',
      id: 0,
      ingredients: '',
      direction: '',
      image: null,
      upvotes: 0,
      views: 0,
      downvotes: 0,
      userId: 0,
      createdAt: '',
      updatedAt: '',
      Reviews: [],
      author: {
        username: '',
        photo: null
      },
    },
  }
};
