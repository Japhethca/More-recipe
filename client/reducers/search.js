import { SEARCH_RECIPE } from '../actions/types';

export default function search(state = [], action) {
  if (action.type === SEARCH_RECIPE) {
    return action.result;
  }
  return state;
}
