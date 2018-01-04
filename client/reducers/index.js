import { combineReducers } from 'redux';
import { reducer as toastrReducer } from 'react-redux-toastr';

import { authReducer } from '../authentication';
import { profileReducer } from '../dashboard';
import loader from './loader';
import recipeReducer from '../recipes/recipeReducer';
import results from '../search/reducer';

const rootReducers = combineReducers({
  auth: authReducer,
  loader,
  profile: profileReducer,
  recipeReducer,
  results,
  toastr: toastrReducer,
});

export default rootReducers;
