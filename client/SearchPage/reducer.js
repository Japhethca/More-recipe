import { SEARCH_RECIPE_SUCCESS, SEARCH_RECIPE_START, SEARCH_RECIPE_FAILED } from './actionTypes';

const initialState = {
  payload: [],
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
