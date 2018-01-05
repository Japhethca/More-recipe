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

// let index = 0;

/**
 * updates an object in state without mutation
 * @param {Array} array state array
 * @param {Object} newItem redux action
 * @returns {Object} udpated object of item
 */
const updateItemInArray = (array, newItem) => {
  const arrayIndex = array.findIndex(itm => itm.id === newItem.id);

  const updatedItems = array.map((item, index) => {
    if (index !== arrayIndex) {
      return item;
    }
    return { ...item, ...newItem };
  });
  return updatedItems;
};

/**
 * @param {Object}  state - initial state
 * @param {Object} action - redux action
 * @returns {Object} - current state
 */
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
        },
        recipes: updateItemInArray(state.recipes, action.recipe)
      };

    case DOWNVOTE_RECIPE:
      return {
        ...state,
        recipe: {
          ...state.recipe,
          downvotes: action.recipe.downvotes,
          upvotes: action.recipe.upvotes,
        },
        recipes: updateItemInArray(state.recipes, action.recipe)
      };

    case GET_ALL_RECIPES:
      return {
        ...state,
        recipes: [
          ...action.recipes
        ]
      };

    case UPDATE_RECIPE:
      return {
        ...state,
        recipes: updateItemInArray(state.recipes, action.recipe),
        userRecipes: updateItemInArray(state.userRecipes, action.recipe),
        favorites: updateItemInArray(state.favorites, action.recipe)
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
