import { DOWNVOTE_RECIPE, UPVOTE_RECIPE, GET_USER_RECIPES, DELETE_USER_RECIPE, ADD_NEW_RECIPE, UPDATE_RECIPE, } from '../actions/types';

/**
 * @param {array} list
 * @param {object} action
 * @returns {object} update object
 */
function updateObjectArray(list, action) {
  return list.map((recipe, index) => {
    if (index !== action.index) {
      return recipe;
    }
    return { ...recipe, ...action.recipe };
  });
}
let index = 0;
let recipe;
let item = {};


/**
 * @export
 * @param {array} state - initial state
 * @param {object} action
 * @returns {array} new state
 */
export default function userRecipes(state = [], action) {
  switch (action.type) {
    case GET_USER_RECIPES:
      state = action.userRecipes;
      return state;
    case DELETE_USER_RECIPE:
      return state.filter(thisRecipe => thisRecipe.id !== action.id);
    case ADD_NEW_RECIPE:
      return [
        ...state,
        action.recipe
      ];
    case UPVOTE_RECIPE:
      index = state.findIndex(rec => rec.id === action.recipe.id);
      item = { index, recipe: action.recipe };
      return updateObjectArray(state, item);

    case DOWNVOTE_RECIPE:
      index = state.findIndex(rec => rec.id === action.recipe.id);
      item = { index, recipe: action.recipe };
      return updateObjectArray(state, item);
    case UPDATE_RECIPE:
      index = state.findIndex(thisRecipe => thisRecipe.id === action.recipe.id);
      recipe = { index, recipe: action.recipe };
      return updateObjectArray(state, recipe);
    default:
      return state;
  }
}
