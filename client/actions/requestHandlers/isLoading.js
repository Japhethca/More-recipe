import { IS_LOADING } from '../types';
/**
 * @export
 * @param {boolean} value
 * @returns {object} action
 */
export default function isLoading(value) {
  return {
    type: IS_LOADING,
    isLoading: value
  };
}
