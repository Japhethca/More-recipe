import { combineReducers } from 'redux';
import auth from './loginAuth';
import recipes from './recipes';
import userRecipes from './userRecipes';
import reviews from './recipeReviews';
import profile from './profile';
import favorites from './favorites';
import isLoading from './loading';

const rootReducers = combineReducers({
  userRecipes,
  profile,
  recipes,
  favorites,
  reviews,
  auth,
  isLoading,
});

export default rootReducers;
