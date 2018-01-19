import axios from 'axios';
import { toastr } from 'react-redux-toastr';


import fileUpload from '../utilities/fileUpload';
import {
  UPDATE_USER_PROFILE,
  UPDATE_USER_PROFILE_START,
  UPDATE_USER_PROFILE_FAILED,
  GET_USER_PROFILE,
  GET_USER_PROFILE_FAILED,
  GET_USER_PROFILE_START } from './actionTypes';
import * as types from '../Recipes/actionTypes';


/**
 * @description dispatch on fetching user favorites success
 * @param {object} profile
 * @param {object} isFetching
 * @returns {object} redux action
 */
export const getUserProfile = profile => ({
  type: GET_USER_PROFILE,
  profile,
});

/**
 * @description dispatch on fetching user profile start
 * @param {object} profile
 * @param {object} isFetching
 * @returns {object} redux action
 */
export const getUserProfileStart = () => ({
  type: GET_USER_PROFILE_START,
});

/**
 * @description dispatch when getting user profile fails
 * @returns {object} redux action
 */
export const getUserProfileFailed = () => ({
  type: GET_USER_PROFILE_FAILED,
});

/**
 * @description handle submiting user profile
 * @export
 * @returns {promise} axios promise
 */
export const handleGetUserProfile = () => (dispatch) => {
  dispatch(getUserProfileStart());
  return axios.get('/api/users/profile')
    .then((res) => {
      dispatch(getUserProfile(res.data));
    }).catch(() => {
      dispatch(getUserProfileFailed());
    });
};


/**
 * @description edit user profile action creators
 * @param {object} newProfile - user object
 * @param {object} newProfile - user object
 * @param {Boolean} isFetching - user object
 * @returns {object} redux action
 */

export const updateProfileAction = newProfile => ({
  type: UPDATE_USER_PROFILE,
  newProfile
});

/**
 * @description edit user profile action creators
 * @param {object} newProfile - user object
 * @param {object} newProfile - user object
 * @param {Boolean} isFetching - user object
 * @returns {object} redux action
 */

export const updateProfileStartAction = () => ({
  type: UPDATE_USER_PROFILE_START
});

/**
 * @description dispatched when updating profile fails
 * @returns {object} redux action
 */

export const updateProfileFailedAction = () => ({
  type: UPDATE_USER_PROFILE_FAILED,
});

/**
 * @description make an api request for to get users profile
 * @export
 * @param {Object} profileData - user object
 * @returns {promise} axios or supseragent
 */
export const handleUpdateUserProfile = profileData => async (dispatch) => {
  dispatch(updateProfileStartAction());
  if (typeof (profileData.photo) === 'object') {
    await fileUpload(profileData.photo).then((response) => {
      profileData.photo = response.body.secure_url;
    }).catch(() => {
      dispatch(updateProfileFailedAction());
      toastr.error('failed to load image');
    });
  }
  return axios.put('/api/users/profile', profileData).then((response) => {
    dispatch(updateProfileAction(response.data.userData));
    toastr.success(response.data.message);
  }).catch((error) => {
    dispatch(updateProfileFailedAction());
    toastr.error(error.response.data.message);
  });
};

/**
 * @description dispatch on start of api call
 * @returns {Object} action
 */
export const fetchUserRecipesStartAction = () => ({
  type: types.FETCH_USER_RECIPES_START,
});

/**
 * @description dispatched when fetching user recipes fails
 * @returns {Object} action
 */
export const fetchUserRecipesFailedAction = () => ({
  type: types.FETCH_USER_RECIPES_FAILED,
});

/**
 * @description dispatch when fetching user recipes is successful
 * @param {array} payload
 * @returns {Object} action
 */
export const userRecipesAction = payload => ({
  type: types.FETCH_USER_RECIPES_SUCCESS,
  payload,
});

/**
 * @export
 * @returns {promise} axios promise
 */
export const handleGetUserRecipes = () => (dispatch) => {
  dispatch(fetchUserRecipesStartAction());
  return axios.get('/api/users/recipes')
    .then((response) => {
      dispatch(userRecipesAction(response.data.recipes));
    }).catch(() => {
      dispatch(fetchUserRecipesFailedAction());
    });
};

/**
 * @description dispatched on user favorites fetch success
 * @param {array} payload
 * @returns {Object} action
 */
export const getFavoritesAction = payload => ({
  type: types.FETCH_USER_FAVORITES_SUCCESS,
  payload,
});

/**
 * @description dispatched when request starts
 * @returns {Object} action
 */
export const getFavoritesStartAction = () => ({
  type: types.FETCH_USER_FAVORITES_START,
});

/**
 * @description dispatched when fetch favorites request fails
 * @returns {Object} action
 */
export const getFavoritesFailedAction = () => ({
  type: types.FETCH_USER_FAVORITES_FAILED,
});

/**
 * @description an action for getting users favorite recipes
 * @export
 * @returns {promise} axios promise
 */
export const handleGetFavorites = () => (dispatch) => {
  dispatch(getFavoritesStartAction());
  return axios.get('/api/users/favorites')
    .then((response) => {
      const favorites = response.data.favorites
        .map(favorite => favorite.Recipe);
      dispatch(getFavoritesAction(favorites));
    }).catch(() => {
      dispatch(getFavoritesFailedAction());
    });
};
