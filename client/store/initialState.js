export default {
  profile: {},
  results: [],
  auth: {
    isAuthenticated: false,
    user: {},
    errors: ''
  },
  recipeReducer: {
    NotFound: false,
    recipes: [],
    userRecipes: [],
    favorites: [],
    pagination: {
      currentPage: 0,
      totalPages: 0
    },
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
