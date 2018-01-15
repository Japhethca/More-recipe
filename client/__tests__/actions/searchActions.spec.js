import expect from 'expect';

import mockStore, { mock } from '../__mock__/configMockStore';
import mockData from '../__mock__/mockData';
import { SEARCH_RECIPE_SUCCESS,
  SEARCH_RECIPE_START,
  SEARCH_RECIPE_FAILED } from '../../SearchPage/actionTypes';
import searchAction from '../../SearchPage/actions';


describe('SEARCH RECIPE actions', () => {
  afterEach(() => {
    mock.reset();
    mock.restore();
  });

  it('creates SEARCH_RECIPE_SUCCESS actions when fetching search results has been done', () => {
    mock.onGet('/api/recipes?search=egusi')
      .replyOnce(200, {
        recipes: mockData.recipes,
        count: 3
      });

    const expectedActions = [
      {
        type: SEARCH_RECIPE_START
      },
      {
        type: SEARCH_RECIPE_SUCCESS,
        payload: mockData.recipes,
        currentPage: 1,
        totalPages: 1,
      },
    ];
    const store = mockStore({});

    store.dispatch(searchAction('egusi')).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  it('creates SEARCH_RECIPE actions when fetching fails', () => {
    mock.onGet('/api/recipes?search=kkjkjnb')
      .replyOnce(404);

    const expectedActions = [
      {
        type: SEARCH_RECIPE_START
      },
      {
        type: SEARCH_RECIPE_FAILED,
      },
    ];
    const store = mockStore({});

    store.dispatch(searchAction('kkjkjnb')).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });
});

