import { createStore, compose, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import reduxReset from 'redux-reset';

import reducers from '../reducers';
import initialState from './initialState';


const store = createStore(
  reducers,
  initialState,
  compose(
    applyMiddleware(thunk.withExtraArgument()),
    reduxReset(),
    window.devToolsExtension && process.env.NODE_ENV === 'development' ? window.devToolsExtension() : f => f
  )
);


export default store;
