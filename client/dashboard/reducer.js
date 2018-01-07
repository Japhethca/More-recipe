import { EDIT_USER_PROFILE, GET_USER_PROFILE } from './actionTypes';

const initialState = {
  payload: {},
  isFetching: false
};

/**
 * @export
 * @param {object} [state={}]
 * @param {object} action
 * @returns {object} new state
 */
export default (state = initialState, action) => {
  switch (action.type) {
    case GET_USER_PROFILE:
      return {
        ...state,
        payload: { ...action.profile },
        isFetching: action.isFetching
      };

    case EDIT_USER_PROFILE:
      return {
        ...state,
        payload: { ...action.newProfile },
        isFetching: action.isFetching
      };

    default:
      return state;
  }
};
