import axios from 'axios';
import { toastr } from 'react-redux-toastr';

import upload from '../utilities/fileUpload';
import { UPDATE_RECIPE, ADD_NEW_RECIPE,
  FETCH_SINGLE_RECIPE_FAILED,
  FETCH_SINGLE_RECIPE_START,
  FETCH_SINGLE_RECIPE_SUCCESS,
  DELETE_USER_RECIPE, ADD_TO_FAVORITES,
  REMOVE_FROM_FAVORITES, IS_FETCHING, RECIPE_CREATED } from './actionTypes';

  /**
 * @description creates isfetching action
 * @param {Boolean} state --http loading state
 * @return {Object} - action
 */
export const isFetching = state => ({
  type: IS_FETCHING,
  isFetching: state
});

/**
 * @description creates update recipe action
 * @param {object} recipe - recipe object
 * @returns {object} action
 */
const updateRecipeAction = recipe => ({
  type: UPDATE_RECIPE,
  recipe
});

const created = () => ({
  type: RECIPE_CREATED
});

/**
 * @description creates add recipe action
 * @param {object} recipe
 * @returns {object} action object
 */
const createRecipeAction = recipe => ({
  type: ADD_NEW_RECIPE,
  recipe
});

/**
 * @description handles recipe creation
 * @argument {object} recipeData
 * @returns {promise} axios promise
 */
export const handleCreateRecipe = recipeData => async (dispatch) => {
  dispatch(isFetching(true));
  if (typeof (recipeData.image) === 'object') {
    await upload(recipeData.image).then((res) => {
      recipeData.image = res.body.url;
    }).catch(() => {
      dispatch(isFetching(false));
      toastr.error('failed to load image');
    });
  }
  return axios.post('/api/recipe', recipeData).then((response) => {
    dispatch(created());
    dispatch(createRecipeAction(response.data.recipe));
    toastr.success(response.data.message);
    dispatch(isFetching(false));
  }).catch((error) => {
    dispatch(isFetching(false));
    toastr.error(error.response.data.message);
  });
};

/**
 * @description handles recipe update
 * @argument {object} recipeData
 * @returns {promise} axios promise
 */
export const handleUpdateRecipe = recipeData => async (dispatch) => {
  dispatch(isFetching(true));
  if (typeof (recipeData.image) === 'object') {
    await upload(recipeData.image).then((res) => {
      recipeData.image = res.body.url;
    }).catch(() => {
      dispatch(isFetching(false));
      toastr.error('failed to load image');
    });
  }
  return axios.put(`/api/recipe/${recipeData.id}`, recipeData).then((response) => {
    dispatch(created());
    dispatch(updateRecipeAction(response.data.recipe));
    toastr.success(response.data.message);
    dispatch(isFetching(false));
  }).catch((error) => {
    dispatch(isFetching(false));
    toastr.error(error.response.data.message);
  });
};

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

export const getSingleRecipe = id => (dispatch) => {
  dispatch(fetchSingleRecipeStart());
  return axios.get(`/api/recipe/${id}`)
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
function deleteRecipeAction(id) {
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
      dispatch(deleteRecipeAction(id));
      toastr.info(res.data.message);
    }
  }).catch(error => toastr.info(error.response.data.message));

/**
 * @param {number} id
 * @returns {object} acion
 */
const removeFavoritesAction = id => ({
  type: REMOVE_FROM_FAVORITES,
  id
});

/**
 * @description makes api call for removing recipes from favorites
 * @export
 * @param {number} recipeId
 * @returns {promise} axios promise
 */
export const handleRemoveFromFavorites = recipeId => dispatch => axios.delete(`/api/users/favorites/${recipeId}`)
  .then((response) => {
    if (response.data.status === 'success') {
      dispatch(removeFavoritesAction(recipeId));
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
export const handleAddToFavorites = recipe => dispatch => axios.post(`/api/users/favorites/${recipe.id}`)
  .then((response) => {
    if (response.data.status === 'success') {
      dispatch(addToFavoriteAction(recipe));
      toastr.success(response.data.message);
    }
  }).catch();
