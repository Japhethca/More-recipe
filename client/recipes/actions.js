import axios from 'axios';
import { toastr } from 'react-redux-toastr';


import upload from '../utilities/fileUpload';
import { UPDATE_RECIPE,
  ADD_NEW_RECIPE,
  GET_SINGLE_RECIPE,
  DELETE_USER_RECIPE,
  REMOVE_FROM_FAVORITES,
  ADD_TO_FAVORITES,
  DOWNVOTE_RECIPE,
  NOT_FOUND,
  UPVOTE_RECIPE } from './actionTypes';

/**
 * @param {object} recipe - recipe object
 * @returns {object} action
 */
const updateRecipe = recipe => ({
  type: UPDATE_RECIPE,
  recipe
});

export const notFoundAction = status => ({
  type: NOT_FOUND,
  status
});
/**
 * @param {object} recipe
 * @returns {object} action object
 */
const createRecipe = recipe => ({
  type: ADD_NEW_RECIPE,
  recipe
});

/**
 * @author chidex
 * @argument {object} method
 * @argument {function} actionCreator
 * @returns {promise} axios promise
 */
const handleRequest = (method, actionCreator) => data => (dispatch) => {
  const request = method === 'put' ? axios.put : axios.post;
  const url = method === 'post' ? '/api/recipe' : `/api/recipe/${data.id}`;
  const makeRequest = () => request(url, data)
    .then((res) => {
      dispatch(actionCreator(res.data.recipe));
      toastr.success(res.data.message);
    })
    .catch((error) => {
      if (error.response.data) {
        toastr.error(error.response.data.message);
      }
    });

  if (typeof (data.image) === 'object') {
    return upload(data.image).end((err, res) => {
      if (!err) {
        data.image = res.body.url;
        makeRequest();
      } else {
        toastr.error('failed to load image');
      }
    });
  }
  if (typeof (data.image) !== 'object') {
    makeRequest();
  }
};

export const handleCreateRecipe = handleRequest('post', createRecipe);
export const handleUpdateRecipe = handleRequest('put', updateRecipe);


const fetchRecipe = recipe => (
  {
    type: GET_SINGLE_RECIPE,
    recipe
  }
);

export const getRecipe = id => (dispatch) => {
  dispatch(notFoundAction(false));
  axios.get(`/api/recipe/${id}`)
    .then((response) => {
      dispatch(fetchRecipe(response.data.recipe));
    })
    .catch((error) => {
      if (error.response.status === 404) {
        dispatch(notFoundAction(true));
      }
    });
};

/**
 * @param {number} id
 * @returns {object} action object
 */
function deleteRecipe(id) {
  return {
    type: DELETE_USER_RECIPE,
    id
  };
}

export const handleDeleteRecipe = id => dispatch => axios.delete(`/api/recipe/${id}`)
  .then((res) => {
    if (res.data.status === 'success') {
      dispatch(deleteRecipe(id));
      toastr.info(res.data.message);
    }
  }).catch(error => toastr.info(error.response.data.message));

  /**
 * @param {number} id
 * @returns {object} acion
 */
const removeFavoriteAction = id => ({
  type: REMOVE_FROM_FAVORITES,
  id
});

/**
 * @export
 * @param {number} recipeId
 * @returns {promise} axios promise
 */
export const handleRemoveFavorite = recipeId => dispatch => axios.delete(`/api/users/favorites/${recipeId}`)
  .then((response) => {
    if (response.data.status === 'success') {
      dispatch(removeFavoriteAction(recipeId));
      toastr.info(response.data.message);
    }
  }).catch();

/**
 * @param {object} recipe
 * @returns {object} action
 */
const setUserFavorites = recipe => ({
  type: ADD_TO_FAVORITES,
  recipe
});

/**
 * @export
 * @param {object} recipe
 * @returns {promise} - axios
 */
export const addToFavorites = recipe => dispatch => axios.post(`/api/users/favorites/${recipe.id}`)
  .then((response) => {
    if (response.data.status === 'success') {
      dispatch(setUserFavorites(recipe));
      toastr.success(response.data.message);
    }
  }).catch();

/**
 * @param {number} id
 * @returns {object} acion
 */
const removeFromFavorites = id => ({
  type: REMOVE_FROM_FAVORITES,
  id
});

/**
 * @export
 * @param {number} recipeId
 * @returns {promise} axios promise
 */
export const removeFavorite = recipeId => dispatch => axios.delete(`/api/users/favorites/${recipeId}`)
  .then((response) => {
    if (response.data.status === 'success') {
      dispatch(removeFromFavorites(recipeId));
      toastr.info(response.data.message);
    }
  }).catch();

/**
 * @param {object} recipe
 * @returns {object} action object
 */
const downvote = recipe => ({
  type: DOWNVOTE_RECIPE,
  recipe
});

export const handleDownvote = id => dispatch => axios.put(`/api/recipe/${id}/downvote`)
  .then((res) => { dispatch(downvote(res.data.recipe)); }).catch();

  /**
 * @param {object} recipe
 * @returns {object} sction
 */
const upvote = recipe => ({
  type: UPVOTE_RECIPE,
  recipe
});

export const handleUpvote = id => dispatch => axios.put(`/api/recipe/${id}/upvote`)
  .then(res => dispatch(upvote(res.data.recipe))).catch();
