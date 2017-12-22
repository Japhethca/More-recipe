import { createStore, compose, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import reduxReset from 'redux-reset';
import rootReducers from './reducers';


const configureStore = initialState => createStore(
  rootReducers,
  initialState,
  compose(
    applyMiddleware(thunk),
    reduxReset(),
    window.devToolsExtension ? window.devToolsExtension() : f => f
  )
);

export default configureStore;
