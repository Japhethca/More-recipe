import expect from 'expect';

import profileMock from '../__mock__/profileMock';
import mockStore, { mock } from '../__mock__/configMockStore';
import * as types from '../../Dashboard/actionTypes';
import * as actions from '../../Dashboard/actions';

const profileUpdateData = {
  firstname: 'boss',
  lastname: 'baby',
  photo: 'http://www.photoimage.com/image.jpg'
};


describe('PROFILE actions', () => {
  afterEach(() => {
    mock.reset();
    mock.restore();
  });

  it('creates GET_USER_PROFILE_START and GET_USER_PROFILE when fetching profile has been done', () => {
    mock.onGet('/api/users/profile')
      .replyOnce(200, {
        ...profileMock.profile,
      });

    const expectedActions = [
      { type: types.GET_USER_PROFILE_START },
      {
        type: types.GET_USER_PROFILE,
        profile: profileMock.profile,
      },
    ];
    const store = mockStore({});

    store.dispatch(actions.handleGetUserProfile()).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  it('creates GET_USER_PROFILE_FAILED when an error occurs', () => {
    mock.onGet('/api/users/profile')
      .replyOnce(400);

    const expectedActions = [
      { type: types.GET_USER_PROFILE_START },
      {
        type: types.GET_USER_PROFILE_FAILED,
      }
    ];
    const store = mockStore({});

    store.dispatch(actions.handleGetUserProfile()).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });
});

describe('PROFILE UPDATE actions', () => {
  afterEach(() => {
    mock.reset();
    mock.restore();
  });

  it('creates EDIT_USER_PROFILE_START and EDIT_USER_PROFILE when updating profile has been done', () => {
    mock.onPut('/api/users/profile', profileUpdateData)
      .replyOnce(201, {
        userData: profileMock.updateData,
      });

    const expectedActions = [
      { type: types.EDIT_USER_PROFILE_START },
      {
        type: types.EDIT_USER_PROFILE,
        profile: profileMock.updateData,
      },
    ];
    const store = mockStore({});

    store.dispatch(actions.handleEditUserProfile(profileUpdateData)).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  it('creates GET_USER_PROFILE_FAILED when an error occurs', () => {
    mock.onGet('/api/users/profile')
      .replyOnce(400, {
        message: 'update Unsuccessful'
      });

    const expectedActions = [
      { type: types.GET_USER_PROFILE_START },
      {
        type: types.GET_USER_PROFILE_FAILED,
      }
    ];
    const store = mockStore({});

    store.dispatch(actions.handleEditUserProfile(profileUpdateData)).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });
});

describe('GET USER PROFILE ACTION CREATORS', () => {
  it('should return  GET_USER_PROFILE action', () => {
    const expectedActions = profile => (
      {
        type: types.GET_USER_PROFILE,
        profile
      });
    expect(actions.getUserProfile('name')).toEqual(expectedActions('name'));
    expect(actions.getUserProfile('name').type).toEqual(expectedActions('name').type);
  });

  it('should return  GET_USER_PROFILE_START action', () => {
    const expectedActions = () => (
      {
        type: types.GET_USER_PROFILE_START,
      });
    expect(actions.getUserProfileStart().type).toEqual(expectedActions().type);
  });

  it('should return  GET_USER_PROFILE_FAILED action', () => {
    const expectedActions = () => (
      {
        type: types.GET_USER_PROFILE_FAILED,
      });
    expect(actions.getUserProfileFailed().type).toEqual(expectedActions().type);
  });
});

describe('EDIT USER PROFILE ACTION CREATORS', () => {
  it('should return  EDIT_USER_PROFILE action', () => {
    const expectedActions = newProfile => (
      {
        type: types.EDIT_USER_PROFILE,
        newProfile,
        isFetching: false
      });
    expect(actions.editProfileAction('name')).toEqual(expectedActions('name'));
    expect(actions.editProfileAction('name').type).toEqual(expectedActions('name').type);
  });

  it('should return  EDIT_USER_PROFILE_START action', () => {
    const expectedActions = newProfile => (
      {
        type: types.EDIT_USER_PROFILE_START,
        newProfile
      });
    expect(actions.editProfileStartAction({}).type).toEqual(expectedActions({}).type);
  });

  it('should return  EDIT_USER_PROFILE_FAILED action', () => {
    const expectedActions = newProfile => (
      {
        type: types.EDIT_USER_PROFILE_FAILED,
        newProfile
      });
    expect(actions.editProfileFailedAction({}).type).toEqual(expectedActions({}).type);
  });
});

