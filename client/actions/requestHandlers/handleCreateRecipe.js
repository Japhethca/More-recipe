import axios from 'axios';
import { toastr } from 'react-redux-toastr';

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
          axios.post('/api/recipe', data)
            .then((res) => {
              toastr.success(res.data.message);
              dispatch(addNewRecipe(res.data.recipe));
              dispatch(isLoading(false));
            }).catch(() => toastr.error('Unable to process request at this time'));
        } else {
          toastr.error('Failed to download image');
        }
      });
    } else {
      dispatch(isLoading(true));
      axios.post('/api/recipe', data)
        .then((res) => {
          dispatch(addNewRecipe(res.data.recipe));
          toastr.success(res.data.message);
        }).catch(error => toastr.error(error.response.data.message));
      dispatch(isLoading(false));
    }
  };
}
