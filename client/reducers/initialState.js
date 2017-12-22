export default {
  userRecipes: [],
  favorites: [],
  recipes: [],
  profile: {},
  auth: {
    isAuthenticated: false,
    user: {},
    errors: []
  },
  isLoading: false,
  results: [],
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
    author: {
      username: '',
      photo: null
    },
    Reviews: []
  },
  pagination: {
    count: 0,
    page: 1
  }
};
