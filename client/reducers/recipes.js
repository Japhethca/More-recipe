import { GET_ALL_RECIPES, DELETE_USER_RECIPE, ADD_NEW_RECIPE, GET_SINGLE_RECIPE } from '../actions/types';


export default function recipes(state = [], action) {
  switch (action.type) {
    case GET_ALL_RECIPES:
      return [
        ...action.recipes
      ];
    case DELETE_USER_RECIPE:
      return state.filter(recipe => recipe.id !== action.id);
    case ADD_NEW_RECIPE:
      return [
        action.recipe,
        ...state,
        
      ];
    case GET_SINGLE_RECIPE:
      return state.filter(recipe => recipe.id === action.id);
    default:
      return state;
  }
}

