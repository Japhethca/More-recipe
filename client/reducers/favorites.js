import { ADD_TO_FAVORITES, REMOVED_FROM_FAVORITES, GET_USER_FAVORITES } from '../actions/types';


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
    case REMOVED_FROM_FAVORITES:
      return state.filter(recipe => recipe.id !== action.recipeId);
    default:
      return state;
  }
}

