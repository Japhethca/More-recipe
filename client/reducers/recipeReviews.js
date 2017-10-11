import lodash from 'lodash';
import { GET_RECIPE_REVIEW, ADD_NEW_REVIEW, GET_SINGLE_RECIPE_REVIEWS } from '../actions/types';

export default function reviews(state = [], action) {
  switch (action.type) {
    case GET_RECIPE_REVIEW:
      return action.reviews;
    case ADD_NEW_REVIEW:
      return [
        ...state,
        action.review
      ];
    case GET_SINGLE_RECIPE_REVIEWS:
      return [
        ...state.reduce(review => review.recipeid === action.id)
      ];
    default:
      return state;
  }
}

