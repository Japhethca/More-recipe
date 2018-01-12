import expect from 'expect';
import reducer from '../../SearchPage/reducer';
import * as types from '../../SearchPage/actionTypes';
import recipesMock from '../__mock__/recipesMock';

const initialState = {
  payload: [],
  totalPages: 0,
  currentPage: 0,
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
    expect(reducer(initialState, getSearchStartAction).totalPages).toEqual(0);
    expect(reducer(initialState, getSearchStartAction).currentPage).toEqual(0);
    expect(reducer(initialState, getSearchStartAction).payload).toEqual([]);
  });

  it('should handle SEARCH_RECIPE_SUCCESS', () => {
    const getSearchAction = {
      type: types.SEARCH_RECIPE_SUCCESS,
      payload: recipesMock.recipes,
      currentPage: 1,
      totalPages: 2
    };
    expect(reducer(initialState, getSearchAction).isFetching).toEqual(false);
    expect(reducer(initialState, getSearchAction).totalPages).toEqual(2);
    expect(reducer(initialState, getSearchAction).currentPage).toEqual(1);
    expect(reducer(initialState, getSearchAction).payload).toEqual(recipesMock.recipes);
  });

  it('should handle SEARCH_RECIPE_FAILED', () => {
    const getSearchAction = {
      type: types.SEARCH_RECIPE_FAILED,
    };
    expect(reducer(initialState, getSearchAction).isFetching).toEqual(false);
    expect(reducer(initialState, getSearchAction).totalPages).toEqual(0);
    expect(reducer(initialState, getSearchAction).currentPage).toEqual(0);
    expect(reducer(initialState, getSearchAction).payload).toEqual([]);
  });
});
