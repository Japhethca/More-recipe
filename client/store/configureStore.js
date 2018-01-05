import { createStore, compose, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import reduxReset from 'redux-reset';

import rootReducer from '../reducers';
import initialState from './initialState';

// creates redux store
const store = createStore(
  rootReducer,
  initialState,
  compose(
    applyMiddleware(thunk),
    reduxReset(),
    window.devToolsExtension ? window.devToolsExtension() : f => f
  )
);

export default store;
