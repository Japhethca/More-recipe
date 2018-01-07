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
} from './actionTypes';


const initialState = {
  NotFound: false,
  recipes: {
    payload: [],
    totalPages: 0,
    currentPage: 0,
    isFetching: false
  },
  userRecipes: {
    payload: [],
    totalPages: 0,
    currentPage: 0,
    isFetching: false
  },
  favorites: {
    payload: [],
    totalPages: 0,
    currentPage: 0,
    isFetching: false
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
        recipes: { payload: updateItemInArray(state.recipes.payload, action.recipe) }
      };

    case DOWNVOTE_RECIPE:
      return {
        ...state,
        recipe: {
          ...state.recipe,
          downvotes: action.recipe.downvotes,
          upvotes: action.recipe.upvotes,
        },
        recipes: { payload: updateItemInArray(state.recipes.payload, action.recipe) }
      };

    case GET_ALL_RECIPES:
      return {
        ...state,
        recipes: {
          currentPage: action.currentPage,
          totalPages: action.totalPages,
          payload: [...action.payload],
          isFetching: action.isFetching
        }
      };

    case UPDATE_RECIPE:
      return {
        ...state,
        recipes: {
          ...state.recipes,
          payload: updateItemInArray(state.recipes.payload, action.recipe)
        },
        userRecipes: {
          ...state.userRecipes,
          payload: updateItemInArray(state.userRecipes.payload, action.recipe)
        },
        favorites: {
          ...state.favorites,
          payload: updateItemInArray(state.favorites.payload, action.recipe)
        }
      };

    case DELETE_USER_RECIPE:
      return {
        ...state,
        recipes: {
          ...state.recipes,
          payload: state.recipes.payload.filter(recipe => recipe.id !== action.id)
        },
        userRecipes: {
          ...state.userRecipes,
          payload: state.userRecipes.payload.filter(recipe => recipe.id !== action.id)
        },
        favorites: {
          ...state.favorites,
          payload: state.favorites.payload.filter(recipe => recipe.id !== action.id)
        }
      };

    case ADD_NEW_RECIPE:
      return {
        ...state,
        recipes: { payload: [action.recipe, ...state.recipes.payload] },
        userRecipes: { payload: [action.recipe, ...state.userRecipes.payload] }
      };

    case GET_USER_FAVORITES:
      return {
        ...state,
        favorites: {
          currentPage: action.currentPage,
          totalPages: action.totalPages,
          payload: [...action.payload],
          isFetching: action.isFetching
        }
      };

    case ADD_TO_FAVORITES:
      return {
        ...state,
        favorites: {
          payload: [
            action.recipe,
            ...state.favorites.payload
          ]
        }
      };

    case GET_USER_RECIPES:
      return {
        ...state,
        userRecipes: {
          currentPage: action.currentPage,
          totalPages: action.totalPages,
          payload: [...action.payload],
          isFetching: action.isFetching
        }
      };

    case REMOVE_FROM_FAVORITES:
      return {
        ...state,
        favorites: {
          ...state.favorites,
          payload: state.favorites.payload.filter(favorite => favorite.id !== action.id)
        }
      };

    case NOT_FOUND:
      return {
        ...state, NotFound: action.status
      };

    default:
      return state;
  }
};
