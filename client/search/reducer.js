import SEARCH_RECIPE from './actionTypes';

const search = (state = [], action) => {
  switch (action.type) {
    case SEARCH_RECIPE:
      return [...action.results];
    default:
      return state;
  }
};

export default search;
