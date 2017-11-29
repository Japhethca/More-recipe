import { IS_LOADING } from '../actions/types';

/**
 * @export
 * @param {boolean} [state=false]
 * @param {object} action
 * @returns {boolean} new state
 */
export default function isLoading(state = false, action) {
  switch (action.type) {
    case IS_LOADING:
      return action.isLoading;
    default:
      return state;
  }
}
