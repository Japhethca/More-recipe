import { combineReducers } from 'redux';
import { reducer as toastrReducer } from 'react-redux-toastr';

import { authReducer } from '../authentication';
import profileReducer from '../Dashboard/reducer';
import loader from './loader';
import recipeReducer from '../Recipes/recipeReducer';
import results from '../SearchPage/reducer';

const rootReducers = combineReducers({
  auth: authReducer,
  loader,
  profile: profileReducer,
  recipeReducer,
  results,
  toastr: toastrReducer,
});

export default rootReducers;
