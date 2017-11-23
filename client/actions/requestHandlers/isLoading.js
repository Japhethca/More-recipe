import { IS_LOADING } from '../types';

export default function isLoading(value) {
  return {
    type: IS_LOADING,
    isLoading: value
  };
}
