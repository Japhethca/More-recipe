import { combineReducers } from 'redux';

import auth from './loginAuth';
import recipes from './recipes';
import userRecipes from './userRecipes';
import profile from './profile';
import favorites from './favorites';
import isLoading from './loading';
import results from './searchResult';

const rootReducers = combineReducers({
  userRecipes,
  profile,
  recipes,
  favorites,
  auth,
  isLoading,
  results
});

export default rootReducers;
