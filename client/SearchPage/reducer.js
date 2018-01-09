import SEARCH_RECIPE from './actionTypes';

const initialState = {
  payload: [],
  totalPages: 0,
  currentPage: 0,
  isFetching: false
};

const search = (state = initialState, action) => {
  switch (action.type) {
    case SEARCH_RECIPE:
      return {
        currentPage: action.currentPage,
        totalPages: action.totalPages,
        payload: [...action.payload],
        isFetching: action.isFetching
      };
    default:
      return state;
  }
};

export default search;
