import expect from 'expect';

import recipesMock from '../__mock__/recipesMock';
import mockStore, { mock } from '../__mock__/configMockStore';
import * as types from '../../Recipes/actionTypes';
import getAllRecipes from '../../HomePage/actions';
import * as dashboardActions from '../../Dashboard/actions';
import * as recipeActions from '../../Recipes/actions';


describe('LATEST RECIPES actions', () => {
  afterEach(() => {
    mock.reset();
    mock.restore();
  });

  it('creates FETCH_LATEST_RECIPES_START and FETCH_LATEST_RECIPES_SUCCESS actions when fetching recipes has been done', () => {
    mock.onGet('/api/recipes?limit=12&page=1')
      .replyOnce(200, {
        recipes: recipesMock.recipes,
        count: 3
      });

    const expectedActions = [
      { type: types.FETCH_LATEST_RECIPES_START },
      {
        type: types.FETCH_LATEST_RECIPES_SUCCESS,
        payload: recipesMock.recipes,
        currentPage: 1,
        totalPages: 1,
        isFetching: false,
      },
    ];
    const store = mockStore({});

    store.dispatch(getAllRecipes()).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  it('creates FETCH_LATEST_RECIPES_START and FETCH_LATEST_RECIPES_FAILED actions when fetching recipes fails', () => {
    mock.onGet('/api/recipes?limit=12&page=1')
      .replyOnce(404);

    const expectedActions = [
      { type: types.FETCH_LATEST_RECIPES_START },
      { type: types.FETCH_LATEST_RECIPES_FAILED },
    ];

    const store = mockStore({});

    store.dispatch(getAllRecipes(1, 1)).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });
});

describe('SINGLE RECIPE actions', () => {
  afterEach(() => {
    mock.reset();
    mock.restore();
  });

  it('should create FETCH_SINGLE_RECIPE_START when starting to fetch recipe', () => {
    mock.onGet('/api/recipe/1')
      .replyOnce(200);

    const expectedActions = [
      {
        type: types.FETCH_SINGLE_RECIPE_START
      }
    ];

    const store = mockStore({});

    store.dispatch(recipeActions.getSingleRecipe(1))
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
  });

  it('should create FETCH_SINGLE_RECIPE_SUCCESS when single recipe is fetched', () => {
    mock.onGet('/api/recipe/1')
      .replyOnce(200, {
        recipe: recipesMock.recipe
      });

    const expectedActions = [
      {
        type: types.FETCH_SINGLE_RECIPE_SUCCESS,
        recipe: recipesMock.recipe
      }
    ];

    const store = mockStore({});

    store.dispatch(recipeActions.getSingleRecipe(1))
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
  });

  it('should create FETCH_SINGLE_RECIPE_FAILED when fetch fails', () => {
    mock.onGet('/api/recipe/1')
      .replyOnce(400, {
        recipe: recipesMock.recipe
      });

    const expectedActions = [
      {
        type: types.FETCH_SINGLE_RECIPE_FAILED,
        recipe: recipesMock.recipe
      }
    ];

    const store = mockStore({});

    store.dispatch(recipeActions.getSingleRecipe(1))
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
  });
});

describe('USER FAVORITES actions', () => {
  it('should create FETCH_USER_FAVORITES_START when starting for fetch favorites', () => {
    mock.onGet('/api/users/favorites?limit=12&page=1')
      .reply(200);
    const expectedActions = [
      {
        type: types.FETCH_USER_FAVORITES_START
      },
      {
        type: types.FETCH_USER_FAVORITES_FAILED
      },
    ];
    const store = mockStore({});

    store.dispatch(dashboardActions.handleGetFavorites())
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
  });

  it('should create FETCH_USER_FAVORITES_SUCCESS when fetch is complete', () => {
    mock.onGet('/api/users/favorites?limit=12&page=1')
      .replyOnce(200, {
        favorites: recipesMock.recipes,
        count: 1
      });
    const expectedActions = [
      {
        type: types.FETCH_USER_FAVORITES_SUCCESS,
        favorites: recipesMock.recipes
      }
    ];
    const store = mockStore({});

    store.dispatch(dashboardActions.handleGetFavorites())
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
  });

  it('should create FETCH_USER_FAVORITES_FAILED when fetch fails', () => {
    mock.onGet('/api/users/favorites', { params: { limit: 4, page: 1 } })
      .replyOnce(404);
    const expectedActions = [
      {
        type: types.FETCH_USER_FAVORITES_START,
      },
      {
        type: types.FETCH_USER_FAVORITES_FAILED,
      }
    ];
    const store = mockStore({});

    store.dispatch(dashboardActions.handleGetFavorites())
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
  });
});

describe('USER RECIPES actions', () => {
  it('should create FETCH_USER_RECIPES_START when starting for fetch user recipes', () => {
    mock.onGet('/api/users/favorites', { params: { limit: 4, page: 1 } })
      .replyOnce(200);
    const expectedActions = [
      {
        type: types.FETCH_USER_RECIPES_START,
        userRecipes: recipesMock.recipes
      }
    ];
    const store = mockStore({});

    store.dispatch(dashboardActions.handleGetUserRecipes())
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
  });

  it('should create FETCH_USER_RECIPES_SUCCESS when user recipes has been fetched', () => {
    mock.onGet('/api/users/favorites', { params: { limit: 4, page: 1 } })
      .replyOnce(200, {
        userRecipes: recipesMock.recipes
      });
    const expectedActions = [
      {
        type: types.FETCH_USER_RECIPES_START,
        userRecipes: recipesMock.recipes
      }
    ];
    const store = mockStore({});

    store.dispatch(dashboardActions.handleGetUserRecipes())
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
  });

  it('should create FETCH_USER_RECIPES_FAILED when request fails', () => {
    mock.onGet('/api/users/favorites', { params: { limit: 4, page: 1 } })
      .replyOnce(404);
    const expectedActions = [
      {
        type: types.FETCH_USER_RECIPES_FAILED,
        userRecipes: recipesMock.recipes
      }
    ];
    const store = mockStore({});

    store.dispatch(dashboardActions.handleGetUserRecipes())
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
  });
});

describe('DELETE RECIPE actions', () => {
  it('should create DELETE_USER_RECIPE when recipe is deleted', () => {
    mock.onDelete('/api/recipe/1')
      .replyOnce(200);
    const expectedActions = [
      {
        type: types.DELETE_USER_RECIPE,
        id: 1
      }
    ];
    const store = mockStore({});

    store.dispatch((recipeActions.handleDeleteRecipe(1)))
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
  });

  it('should create DELETE_USER_RECIPE_FAILED when recipe deletion fails', () => {
    mock.onDelete('/api/recipe/1')
      .replyOnce(400);
    const expectedActions = [
      {
        type: types.DELETE_USER_RECIPE_FAILED
      }
    ];
    const store = mockStore({});

    store.dispatch((recipeActions.handleDeleteRecipe(1)))
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
  });
});

describe('CREATE UPDATE RECIPE actions', () => {
  const recipeData = {
    name: 'egusi recipe',
    description: 'a nice food',
    direction: "just cook it you'll see",
    ingredients: 'thats it'
  };

  it('should create ADD_NEW_RECIPE when recipe is created', () => {
    mock.onPost('/api/recipe', recipeData)
      .replyOnce(201, {
        recipe: recipesMock.recipe
      });

    const expectedActions = [
      {
        type: types.ADD_NEW_RECIPE,
        recipe: recipesMock.recipe
      }
    ];
    const store = mockStore({});

    store.dispatch((recipeActions.handleCreateRecipe(1)));
    // .then(() => {
    expect(store.getActions()).toEqual(expectedActions);
    // });
  });
});
