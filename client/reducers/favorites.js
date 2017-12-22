import {
  ADD_TO_FAVORITES,
  REMOVED_FROM_FAVORITES,
  GET_USER_FAVORITES,
  UPVOTE_RECIPE,
  DOWNVOTE_RECIPE
} from '../actions/types';
/**
 * @param {arrar} array - recipe
 * @param {object} action
 * @returns {object} - recipe
 */
function updateObjectArray(array, action) {
  return array.map((recipe, index) => {
    if (index !== action.index) {
      return recipe;
    }
    return { ...recipe, ...action.recipe };
  });
}

let index = 0;
let item = {};

/**
 * @export
 * @param {array} [state=[]]
 * @param {object} action
 * @returns {array} new state
 */
export default function favorites(state = [], action) {
  switch (action.type) {
    case GET_USER_FAVORITES:
      return [
        ...action.favorites
      ];
    case ADD_TO_FAVORITES:
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

    case REMOVED_FROM_FAVORITES:
      return state.filter(recipe => recipe.id !== action.recipeId);
    default:
      return state;
  }
}

