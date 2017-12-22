import { RECIPES_COUNT, REVIEWS_COUNT } from '../actions/types';

const initialState = {
  page: 1,
  count: 0
};

export default (state = initialState, action) => {
  switch (action.type) {
    case RECIPES_COUNT:
      return { page: action.page, count: action.count };
    case REVIEWS_COUNT:
      return { page: action.page, count: action.count };
    default:
      return state;
  }
};

