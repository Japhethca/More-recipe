import { GET_ALL_RECIPES, DELETE_USER_RECIPE, ADD_NEW_RECIPE, UPDATE_RECIPE, UPVOTE_RECIPE, DOWNVOTE_RECIPE } from '../actions/types';

/**
 * @param {array} list
 * @param {object} action
 * @returns {object} update recipe
 */
function updateObjectArray(list, action) {
  return list.map((recipe, index) => {
    if (index !== action.index) {
      return recipe;
    }
    return Object.assign({}, recipe, action.recipe);
  });
}
let index = 0;
let item = {};
let recipe;
/**
 * @export
 * @param {array} [state=[]]
 * @param {object} action
 * @returns {array} new state
 */
export default function recipes(state = [], action) {
  switch (action.type) {
    case GET_ALL_RECIPES:
      return [
        ...action.recipes
      ];

    case UPDATE_RECIPE:
      index = state.findIndex(rec => rec.id === action.recipe.id);
      recipe = { index, recipe: action.recipe };
      return updateObjectArray(state, recipe);

    case DELETE_USER_RECIPE:
      return state.filter(recipe => recipe.id !== action.id);

    case ADD_NEW_RECIPE:
      return [
        action.recipe,
        ...state
      ];

    case UPVOTE_RECIPE:
      index = state.findIndex(rec => rec.id === action.recipe.id);
      item = { index, recipe: action.recipe };
      return updateObjectArray(state, item);

    case DOWNVOTE_RECIPE:
      index = state.findIndex(rec => rec.id === action.recipe.id);
      item = { index, recipe: action.recipe };
      return updateObjectArray(state, item);

    default:
      return state;
  }
}
