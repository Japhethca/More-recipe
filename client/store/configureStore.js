import { createStore, compose, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import reduxReset from 'redux-reset';

import rootReducer from '../reducers';
import initialState from './initialState';

// creates redux store
const devStore = createStore(
  rootReducer,
  initialState,
  compose(
    applyMiddleware(thunk.withExtraArgument()),
    reduxReset(),
    window.devToolsExtension ? window.devToolsExtension() : f => f
  )
);

const prodStore = createStore(
  rootReducer,
  initialState,
  compose(
    applyMiddleware(thunk.withExtraArgument()),
    reduxReset(),
  )
);

const store = process.env.NODE_ENV === 'production' ? prodStore : devStore;
export default store;
