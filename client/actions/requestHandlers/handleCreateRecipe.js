import axios from 'axios';
import upload from './handleFileUpload';
import isLoading from './isLoading';
import { ADD_NEW_RECIPE } from '../types';

/**
 * @param {object} recipe
 * @returns {object} action object
 */
function addNewRecipe(recipe) {
  return {
    type: ADD_NEW_RECIPE,
    recipe
  };
}

/**
 * @export
 * @param {object} data - recipe object
 * @returns {promise} - axios promise
 */
export default function handleCreateRecipe(data) {
  return (dispatch) => {
    if (typeof (data.image) === 'object') {
      dispatch(isLoading(true));
      upload(data.image).end((err, res) => {
        if (!err) {
          data.image = res.body.url;
          axios.post('/api/recipes', data)
            .then((res) => {
              Materialize.toast('<span class="green">Recipe Successfully Created!</span>', 5000);
              dispatch(addNewRecipe(res.data.recipe));
              dispatch(isLoading(false));
            }).catch(err => Materialize.toast('Recipe was not created!', 5000));
        } else {
          Materialize.toast('Unable to load image', 5000);
        }
      });
    } else {
      dispatch(isLoading(true));
      axios.post('/api/recipes', data)
        .then((res) => {
          dispatch(addNewRecipe(res.data.recipe));
          Materialize.toast('Recipe Successfully Created!', 5000);
        }).catch(err => Materialize.toast('Recipe was not created!', 5000));
      dispatch(isLoading(false));
    }
  };
}
