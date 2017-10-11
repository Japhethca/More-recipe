import { GET_USER_RECIPES, DELETE_USER_RECIPE, ADD_NEW_RECIPE } from '../actions/types';


export default function userRecipers(state = [], action) {
  switch (action.type) {
    case GET_USER_RECIPES:
      state = action.userRecipes;
      return state;
    case DELETE_USER_RECIPE:
      return state.filter(recipe => recipe.id !== action.id);
    case ADD_NEW_RECIPE:
      return [
        ...state,
        action.recipe
      ];
    default:
      return state;
  }
}
