import expect from 'expect';
import reducer from '../../Dashboard/reducer';
import * as types from '../../Dashboard/actionTypes';
import profileMock from '../__mock__/profileMock';

const initialState = {
  payload: {},
  isFetching: false,
  method: 'GET'
};

describe('PROFILE reducer', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual(initialState);
  });

  it('should handle GET_USER_PROFILE_START', () => {
    const getProfileStartAction = {
      type: types.GET_USER_PROFILE_START,
    };
    expect(reducer(initialState, getProfileStartAction).isFetching).toEqual(true);
    expect(reducer(initialState, getProfileStartAction).method).toEqual('GET');
    expect(reducer(initialState, getProfileStartAction).payload).toEqual({});
  });

  it('should handle GET_USER_PROFILE', () => {
    const getProfileAction = {
      type: types.GET_USER_PROFILE,
      profile: profileMock.profile
    };
    expect(reducer(initialState, getProfileAction).isFetching).toEqual(false);
    expect(reducer(initialState, getProfileAction).method).toEqual('GET');
    expect(reducer(initialState, getProfileAction).payload).toEqual(profileMock.profile);
  });

  it('should handle GET_USER_PROFILE_FAILED', () => {
    const getProfileFailedAction = {
      type: types.GET_USER_PROFILE_FAILED,
    };
    expect(reducer(initialState, getProfileFailedAction).isFetching).toEqual(false);
    expect(reducer(initialState, getProfileFailedAction).method).toEqual('GET');
    expect(reducer(initialState, getProfileFailedAction).payload).toEqual({});
  });

  it('should handle EDIT_USER_PROFILE_START', () => {
    const editProfileStartAction = {
      type: types.EDIT_USER_PROFILE_START,
    };
    expect(reducer(initialState, editProfileStartAction).isFetching).toEqual(true);
    expect(reducer(initialState, editProfileStartAction).method).toEqual('PUT');
    expect(reducer(initialState, editProfileStartAction).payload).toEqual({});
  });

  it('should handle EDIT_USER_PROFILE', () => {
    const editProfileAction = {
      type: types.EDIT_USER_PROFILE,
      newProfile: profileMock.profile
    };
    expect(reducer(initialState, editProfileAction).isFetching).toEqual(false);
    expect(reducer(initialState, editProfileAction).method).toEqual('PUT');
    expect(reducer(initialState, editProfileAction).payload).toEqual(profileMock.profile);
  });

  it('should handle EDIT_USER_PROFILE_FAILED', () => {
    const editProfileFailedAction = {
      type: types.EDIT_USER_PROFILE_FAILED,

    };
    expect(reducer(initialState, editProfileFailedAction).isFetching).toEqual(false);
    expect(reducer(initialState, editProfileFailedAction).method).toEqual('PUT');
    expect(reducer(initialState, editProfileFailedAction).payload).toEqual({});
  });
});
