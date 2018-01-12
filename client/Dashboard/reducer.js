import * as types from './actionTypes';

const initialState = {
  payload: {},
  isFetching: false,
  method: 'GET'
};

/**
 * @export
 * @param {object} [state={}]
 * @param {object} action
 * @returns {object} new state
 */
export default (state = initialState, action) => {
  switch (action.type) {
    case types.GET_USER_PROFILE_START:
      return {
        ...state,
        method: 'GET',
        isFetching: true
      };

    case types.GET_USER_PROFILE:
      return {
        ...state,
        payload: { ...action.profile },
        isFetching: false
      };

    case types.GET_USER_PROFILE_FAILED:
      return {
        ...state,
        isFetching: false
      };

    case types.EDIT_USER_PROFILE_START:
      return {
        ...state,
        method: 'PUT',
        isFetching: true
      };

    case types.EDIT_USER_PROFILE:
      return {
        ...state,
        method: 'PUT',
        payload: { ...action.newProfile },
        isFetching: false
      };

    case types.EDIT_USER_PROFILE_FAILED:
      return {
        ...state,
        method: 'PUT',
        payload: { ...action.newProfile },
        isFetching: false
      };

    default:
      return state;
  }
};
