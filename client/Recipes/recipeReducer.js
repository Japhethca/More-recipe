import {
  FETCH_LATEST_RECIPES_FAILED,
  FETCH_LATEST_RECIPES_START,
  FETCH_LATEST_RECIPES_SUCCESS,
  FETCH_SINGLE_RECIPE_FAILED,
  FETCH_SINGLE_RECIPE_START,
  FETCH_SINGLE_RECIPE_SUCCESS,
  FETCH_USER_FAVORITES_FAILED,
  FETCH_USER_FAVORITES_START,
  FETCH_USER_FAVORITES_SUCCESS,
  FETCH_USER_RECIPES_FAILED,
  FETCH_USER_RECIPES_START,
  FETCH_USER_RECIPES_SUCCESS,
  ADD_NEW_RECIPE,
  ADD_NEW_REVIEW,
  UPVOTE_RECIPE,
  UPDATE_RECIPE,
  DOWNVOTE_RECIPE,
  REMOVE_FROM_FAVORITES,
  NOT_FOUND,
  DELETE_USER_RECIPE,
  ADD_TO_FAVORITES
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
    notFound: false,
    isFetching: false,
    payload: {
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
    }
  }
};


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
    case FETCH_SINGLE_RECIPE_START:
      return { ...state, recipe: { ...state.recipe, payload: {}, isFetching: true } };

    case FETCH_SINGLE_RECIPE_FAILED:
      return {
        ...state,
        recipe: {
          ...state.recipe, payload: {}, isFetching: false, notFound: true
        }
      };

    case FETCH_SINGLE_RECIPE_SUCCESS:
      return { ...state, recipe: { payload: { ...state.recipe.payload, ...action.recipe }, isFetching: false, notFound: false } };

    case ADD_NEW_REVIEW:
      return {
        ...state,
        recipe: {
          ...state.recipe,
          payload: {
            ...state.recipe.payload,
            Reviews: [
              ...state.recipe.payload.Reviews,
              action.review
            ]
          }
        }
      };

    case UPVOTE_RECIPE:
      return {
        ...state,
        recipe: {
          ...state.recipe,
          payload: {
            ...state.recipe.payload,
            upvotes: action.recipe.upvotes,
            downvotes: action.recipe.downvotes
          }
        },
        recipes: { ...state.recipes, payload: updateItemInArray(state.recipes.payload, action.recipe) }
      };

    case DOWNVOTE_RECIPE:
      return {
        ...state,
        recipe: {
          ...state.recipe,
          payload: {
            ...state.recipe.payload,
            downvotes: action.recipe.downvotes,
            upvotes: action.recipe.upvotes,
          }
        },
        recipes: { ...state.recipes, payload: updateItemInArray(state.recipes.payload, action.recipe) }
      };

    case FETCH_LATEST_RECIPES_START:
      return {
        ...state,
        recipes: {
          ...state.recipes,
          currentPage: 0,
          payload: [],
          totalPages: 0,
          isFetching: true,
        }
      };

    case FETCH_LATEST_RECIPES_SUCCESS:
      return {
        ...state,
        recipes: {
          currentPage: action.currentPage,
          totalPages: action.totalPages,
          payload: [...action.payload],
          isFetching: false
        }
      };

    case FETCH_LATEST_RECIPES_FAILED:
      return {
        ...state,
        recipes: {
          ...state.recipes,
          isFetching: false
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
        recipes: { ...state.recipes, payload: [action.recipe, ...state.recipes.payload] },
        userRecipes: { ...state.userRecipes, payload: [action.recipe, ...state.userRecipes.payload] }
      };

    case FETCH_USER_RECIPES_START:
      return {
        ...state,
        userRecipes: {
          ...state.userRecipes,
          isFetching: true
        }
      };

    case FETCH_USER_RECIPES_SUCCESS:
      return {
        ...state,
        userRecipes: {
          currentPage: action.currentPage,
          totalPages: action.totalPages,
          payload: [...action.payload],
          isFetching: action.isFetching
        }
      };

    case FETCH_USER_RECIPES_FAILED:
      return {
        ...state,
        userRecipes: {
          ...state.userRecipes,
          isFetching: false
        }
      };

    case FETCH_USER_FAVORITES_START:
      return {
        ...state,
        favorites: {
          ...state.favorites,
          isFetching: true
        }
      };

    case FETCH_USER_FAVORITES_SUCCESS:
      return {
        ...state,
        favorites: {
          currentPage: action.currentPage,
          totalPages: action.totalPages,
          payload: [...action.payload],
          isFetching: false
        }
      };

    case FETCH_USER_FAVORITES_FAILED:
      return {
        ...state,
        favorites: {
          ...state.favorites,
          isFetching: false
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
