import axios from 'axios';
import { ADD_NEW_RECIPE } from '../types';
import addFlashMessages from '../flashMessage';

function addNewRecipe(recipe) {
  return {
    type: ADD_NEW_RECIPE,
    recipe
  };
}

export default data => dispatch => axios.post('/api/recipes', data).then((res) => {
  dispatch(addNewRecipe(res.data.Details));
  addFlashMessages({ type: 'Success', text: 'Recipe added successfully' });
});

