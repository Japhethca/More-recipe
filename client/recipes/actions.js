import axios from 'axios';
import { toastr } from 'react-redux-toastr';

import upload from '../utilities/fileUpload';
import { UPDATE_RECIPE, ADD_NEW_RECIPE,
  FETCH_SINGLE_RECIPE_FAILED,
  FETCH_SINGLE_RECIPE_START,
  FETCH_SINGLE_RECIPE_SUCCESS,
  DELETE_USER_RECIPE, ADD_TO_FAVORITES,
  REMOVE_FROM_FAVORITES, IS_FETCHING } from './actionTypes';

  /**
 * @description creates isfetching action
 * @param {Boolean} state --http loading state
 * @param {Boolean} status --http loading status
 * @param {String} dataType -- type of data being fetched
 * @return {Object} - action
 */
export const isFetching = (state, status = false, dataType = 'recipes') => ({
  type: IS_FETCHING,
  isFetching: state,
  completed: status,
  dataType
});

/**
 * @description creates update recipe action
 * @param {object} recipe - recipe object
 * @returns {object} action
 */
const updateRecipe = recipe => ({
  type: UPDATE_RECIPE,
  recipe
});


/**
 * @description creates add recipe action
 * @param {object} recipe
 * @returns {object} action object
 */
const createRecipe = recipe => ({
  type: ADD_NEW_RECIPE,
  recipe
});

/**
 * @description handles api request
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
      dispatch(isFetching(false, true));
    })
    .catch((error) => {
      if (error.response.data) {
        dispatch(isFetching(false));
        toastr.error(error.response.data.message);
      }
    });
  dispatch(isFetching(true));
  if (typeof (data.image) === 'object') {
    return upload(data.image).end((err, res) => {
      if (!err) {
        data.image = res.body.url;
        makeRequest();
      } else {
        dispatch(isFetching(false));
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

/**
 * @description dispatched when recipe has been fetched
 * @param {object} recipe
 * @returns {object} actions
 */
const fetchSingleRecipe = recipe => (
  {
    type: FETCH_SINGLE_RECIPE_SUCCESS,
    recipe
  }
);

/**
 * @description dispatched when starting to fetch single recipes
 * @returns {object} actions
 */
const fetchSingleRecipeStart = () => (
  {
    type: FETCH_SINGLE_RECIPE_START
  }
);

/**
 * @description dispatched when fetching recipe failed
 * @returns {object} actions
 */
const fetchSingleRecipeFailed = () => (
  {
    type: FETCH_SINGLE_RECIPE_FAILED
  }
);

export const getRecipe = id => (dispatch) => {
  dispatch(fetchSingleRecipeStart());
  axios.get(`/api/recipe/${id}`)
    .then((response) => {
      dispatch(fetchSingleRecipe(response.data.recipe));
    })
    .catch((error) => {
      if (error.response.status === 404) {
        dispatch(fetchSingleRecipeFailed());
      }
    });
};

/**
 * @description delete recipe action creator
 * @param {number} id
 * @returns {object} action object
 */
function deleteRecipe(id) {
  return {
    type: DELETE_USER_RECIPE,
    id
  };
}

/**
 * @description handles deleting recipe
 * @param {Number} id
 * @returns {Promise} axios promise
 */
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
 * @description makes api call for removing recipes from favorites
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
 * @description creates add to favorites action
 * @param {object} recipe
 * @returns {object} action
 */
const addToFavoriteAction = recipe => ({
  type: ADD_TO_FAVORITES,
  recipe
});

/**
 * @description handles add recipe to favorites
 * @export
 * @param {object} recipe
 * @returns {promise} - axios
 */
export const addToFavorites = recipe => dispatch => axios.post(`/api/users/favorites/${recipe.id}`)
  .then((response) => {
    if (response.data.status === 'success') {
      dispatch(addToFavoriteAction(recipe));
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
 * @description handles removing recipe from favorites
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

