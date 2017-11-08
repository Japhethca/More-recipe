import axios from 'axios';
import { GET_ALL_RECIPES } from '../types';

function getRecipes(recipes) {
  return {
    type: GET_ALL_RECIPES,
    recipes
  };
}
export default function () {
  return dispatch => axios.get('/api/recipes').then((res) => {
    dispatch(getRecipes(res.data.List));
  });
}
