import { SEARCH_RECIPE_SUCCESS, SEARCH_RECIPE_START, SEARCH_RECIPE_FAILED } from './actionTypes';

const initialState = {
  payload: [],
  totalPages: 0,
  currentPage: 0,
  isFetching: false
};

const search = (state = initialState, action) => {
  switch (action.type) {
    case SEARCH_RECIPE_START:
      return {
        ...state,
        isFetching: true
      };

    case SEARCH_RECIPE_SUCCESS:
      return {
        currentPage: action.currentPage,
        totalPages: action.totalPages,
        payload: [...action.payload],
        isFetching: false
      };


    case SEARCH_RECIPE_FAILED:
      return {
        ...state,
        isFetching: false
      };
    default:
      return state;
  }
};

export default search;
