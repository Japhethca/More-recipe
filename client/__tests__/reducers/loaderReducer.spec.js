import expect from 'expect';
import reducer from '../../reducers/loader';
import { IS_FETCHING } from '../../Recipes/actionTypes';

const initialState = {
  isFetching: false,
  completed: false,
};

describe('LOADER reducer', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual(initialState);
  });

  it('should handle IS_FETCHING', () => {
    const isFetchingAction = {
      type: IS_FETCHING,
      isFetching: true,
      completed: true
    };
    expect(reducer(initialState, isFetchingAction).isFetching).toEqual(true);
    expect(reducer(initialState, isFetchingAction).completed).toEqual(true);
  });
});
