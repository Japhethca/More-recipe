import { SEARCH_RECIPE } from '../actions/types';

let initialState = { query: null, result: null }
export default function search(state = initialState, action) {
  if (action.type === SEARCH_RECIPE) {
    return { query: action.query, result: action.result };
  }
  return state;
}
