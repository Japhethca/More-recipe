import expect from 'expect';
import reducer from '../../SearchPage/reducer';
import * as types from '../../SearchPage/actionTypes';
import mockData from '../__mock__/mockData';

const initialState = {
  payload: [],
  isFetching: false
};

describe('SEARCH reducer', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual(initialState);
  });

  it('should handle SEARCH_RECIPE_START', () => {
    const getSearchStartAction = {
      type: types.SEARCH_RECIPE_START,
    };
    expect(reducer(initialState, getSearchStartAction).isFetching).toEqual(true);
    expect(reducer(initialState, getSearchStartAction).payload).toEqual([]);
  });

  it('should handle SEARCH_RECIPE_SUCCESS', () => {
    const getSearchAction = {
      type: types.SEARCH_RECIPE_SUCCESS,
      payload: mockData.recipes
    };
    expect(reducer(initialState, getSearchAction).isFetching).toEqual(false);
    expect(reducer(initialState, getSearchAction).payload).toEqual(mockData.recipes);
  });

  it('should handle SEARCH_RECIPE_FAILED', () => {
    const getSearchAction = {
      type: types.SEARCH_RECIPE_FAILED,
    };
    expect(reducer(initialState, getSearchAction).isFetching).toEqual(false);
    expect(reducer(initialState, getSearchAction).payload).toEqual([]);
  });
});
