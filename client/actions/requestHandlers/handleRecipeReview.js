import axios from 'axios';
import { ADD_NEW_REVIEW, GET_SINGLE_RECIPE_REVIEWS } from '../types';


function addNewReview(review) {
  return {
    type: ADD_NEW_REVIEW,
    review
  };
}

export default (id, data) => dispatch => axios.post(`/api/recipes/${id}/reviews`, data).then((res) => {
  dispatch(addNewReview(res.data.Review));
});

