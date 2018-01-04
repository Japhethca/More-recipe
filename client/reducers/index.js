import { combineReducers } from 'redux';
import { reducer as toastrReducer } from 'react-redux-toastr';

import { authReducer } from '../authentication';
import recipeReducer from '../recipes/recipeReducer';
import loader from './loader';
import { profileReducer } from '../dashboard';
import results from '../search/reducer';


const rootReducers = combineReducers({
  recipeReducer,
  loader,
  profile: profileReducer,
  results,
  toastr: toastrReducer,
  auth: authReducer,
});

export default rootReducers;
