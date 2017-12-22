import axios from 'axios';
import { GET_SINGLE_RECIPE } from '../types';


const recipeAction = recipe => (
  {
    type: GET_SINGLE_RECIPE,
    recipe
  }
);

export default id => (dispatch) => {
  axios.get(`/api/recipes/${id}`)
    .then(response => dispatch(recipeAction(response.data.recipe)))
    .catch(error => console.log(error.response.data.message));
};

