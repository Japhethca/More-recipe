import axios from 'axios';
import { DOWNVOTE_RECIPE  } from '../types';

function downvote(recipe) {
  return {
    type: DOWNVOTE_RECIPE ,
    recipe
  };
}
export default id => dispatch => axios.put(`/api/recipes/${id}/downvotes`).then((res) => { dispatch(downvote(res.data.Recipe)); });
