import { combineReducers } from 'redux';
import { reducer as toastrReducer } from 'react-redux-toastr';

import auth from './loginAuth';
import recipes from './recipes';
import userRecipes from './userRecipes';
import profile from './profile';
import favorites from './favorites';
import isLoading from './loading';
import results from './searchResult';
import recipe from './recipe';
import pagination from './pagination';


const rootReducers = combineReducers({
  userRecipes,
  profile,
  recipes,
  favorites,
  auth,
  isLoading,
  results,
  recipe,
  pagination,
  toastr: toastrReducer
});

export default rootReducers;
