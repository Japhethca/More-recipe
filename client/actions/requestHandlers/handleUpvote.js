import axios from 'axios';
import getAllRecipes from './getAllRecipes';

export default id => dispatch => axios.put(`/api/recipes/${id}/upvotes`).then(res => getAllRecipes());
