import { SEARCH_RECIPE } from '../types';

function searchData(data) {
  return {
    type: SEARCH_RECIPE,
    result: data.result,
    query: data.query
  };
}

export default function handleSearch(data) {
  return dispatch => dispatch(searchData(data));
}
