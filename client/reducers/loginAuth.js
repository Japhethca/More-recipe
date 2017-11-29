import lodash from 'lodash';
import { SET_CURRENT_USER } from '../actions/types';


const initialState = {
  isAuthenticated: false,
  user: {},
  errors: []
};

/**
 * @export
 * @param {object} [state=false]
 * @param {object} action
 * @returns {object} new state
 */
export default (state = initialState, action) => {
  switch (action.type) {
    case SET_CURRENT_USER:
      return {
        isAuthenticated: !lodash.isEmpty(action.user),
        user: action.user,
        errors: action.errors
      };

    default:
      return state;
  }
};
