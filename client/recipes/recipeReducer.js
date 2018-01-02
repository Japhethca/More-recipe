import {
  ADD_NEW_RECIPE,
  ADD_NEW_REVIEW,
  ADD_TO_FAVORITES,
  DELETE_USER_RECIPE,
  DOWNVOTE_RECIPE,
  GET_ALL_RECIPES,
  GET_SINGLE_RECIPE,
  GET_USER_FAVORITES,
  GET_USER_RECIPES,
  REMOVE_FROM_FAVORITES,
  UPDATE_RECIPE,
  UPVOTE_RECIPE,
  NOT_FOUND,
  RECIPES_COUNT
} from './actionTypes';


const initialState = {
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
};

let index = 0;
let recipe = {};

const updateObjectArray = (array, action) => array.map((recipe, index) => {
  if (index !== action.index) {
    return recipe;
  }
  return { ...recipe, ...action.recipe };
});

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_SINGLE_RECIPE:
      return { ...state, recipe: action.recipe };

    case ADD_NEW_REVIEW:
      return {
        ...state,
        recipe: {
          ...state.recipe,
          Reviews: [
            ...state.recipe.Reviews,
            action.review
          ]
        }
      };

    case UPVOTE_RECIPE:
      return {
        ...state,
        recipe: {
          ...state.recipe,
          upvotes: action.recipe.upvotes,
          downvotes: action.recipe.downvotes
        }
      };

    case DOWNVOTE_RECIPE:
      return {
        ...state,
        recipe: {
          ...state.recipe,
          downvotes: action.recipe.downvotes,
          upvotes: action.recipe.upvotes,
        }
      };

    case GET_ALL_RECIPES:
      return {
        ...state,
        recipes: [
          ...action.recipes
        ]
      };

    case UPDATE_RECIPE:
      index = state.recipes.findIndex(rec => rec.id === action.recipe.id);
      recipe = { index, recipe: action.recipe };
      return {
        ...state,
        recipes: updateObjectArray(state.recipes, recipe),
        userRecipes: updateObjectArray(state.userRecipes, recipe),
        favorites: updateObjectArray(state.favorites, recipe)
      };

    case DELETE_USER_RECIPE:
      return {
        ...state,
        recipes: state.recipes.filter(recipe => recipe.id !== action.id),
        userRecipes: state.userRecipes.filter(recipe => recipe.id !== action.id),
        favorites: state.favorites.filter(recipe => recipe.id !== action.id)
      };

    case ADD_NEW_RECIPE:
      return {
        ...state,
        recipes: [action.recipe, ...state.recipes],
        userRecipes: [action.recipe, ...state.userRecipes]
      };

    case GET_USER_FAVORITES:
      return {
        ...state,
        favorites: [
          ...action.favorites
        ]
      };

    case ADD_TO_FAVORITES:
      return {
        ...state,
        favorites: [
          action.recipe,
          ...state.favorites
        ]
      };

    case GET_USER_RECIPES:
      return { ...state, userRecipes: action.userRecipes };

    case REMOVE_FROM_FAVORITES:
      return { ...state, favorites: state.favorites.filter(favorite => favorite.id !== action.id) };
    case NOT_FOUND:
      return {
        ...state, NotFound: action.status
      };
    case RECIPES_COUNT:
      return {
        ...state,
        pagination: {
          currentPage: action.curPage,
          totalPages: action.totalPages
        }
      };
    default:
      return state;
  }
};
