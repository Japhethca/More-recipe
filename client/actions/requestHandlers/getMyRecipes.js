import axios from 'axios';
import { GET_USER_RECIPES } from '../../actions/types';

function getUserRecipes(userRecipes) {
  return {
    type: GET_USER_RECIPES,
    userRecipes
  };
}
export default function () {
  return dispatch => axios.get('/api/users/recipes').then((res) => {
    dispatch(getUserRecipes(res.data.Recipes));
  });
}
