import { combineReducers } from 'redux';
import auth from './auth';
import recipes from './recipes';
import userRecipes from './userRecipes';
import reviews from './recipeReviews';
import profile from './profile';
import favorites from './favorites';
import search from './search';

const rootReducers = combineReducers({
  userRecipes,
  profile,
  recipes,
  favorites,
  reviews,
  auth,
  search
});

export default rootReducers;
