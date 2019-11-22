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

  it('should handle GET_USER_PROFILE_START action type', () => {
    const getProfileStartAction = {
      type: types.GET_USER_PROFILE_START,
    };
    expect(reducer(initialState, getProfileStartAction).isFetching).toEqual(true);
    expect(reducer(initialState, getProfileStartAction).method).toEqual('GET');
    expect(reducer(initialState, getProfileStartAction).payload).toEqual({});
  });

  it('should handle GET_USER_PROFILE action type', () => {
    const getProfileAction = {
      type: types.GET_USER_PROFILE,
      profile: profileMock.profile
    };
    expect(reducer(initialState, getProfileAction).isFetching).toEqual(false);
    expect(reducer(initialState, getProfileAction).method).toEqual('GET');
    expect(reducer(initialState, getProfileAction).payload)
      .toEqual(profileMock.profile);
  });

  it('should handle GET_USER_PROFILE_FAILED action type', () => {
    const getProfileFailedAction = {
      type: types.GET_USER_PROFILE_FAILED,
    };
    expect(reducer(initialState, getProfileFailedAction).isFetching).toEqual(false);
    expect(reducer(initialState, getProfileFailedAction).method).toEqual('GET');
    expect(reducer(initialState, getProfileFailedAction).payload).toEqual({});
  });

  it('should handle UPDATE_USER_PROFILE_START action type', () => {
    const updateProfileStartAction = {
      type: types.UPDATE_USER_PROFILE_START,
    };
    expect(reducer(initialState, updateProfileStartAction).isFetching).toEqual(true);
    expect(reducer(initialState, updateProfileStartAction).method).toEqual('PUT');
    expect(reducer(initialState, updateProfileStartAction).payload).toEqual({});
  });

  it('should handle UPDATE_USER_PROFILE action type', () => {
    const updateProfileAction = {
      type: types.UPDATE_USER_PROFILE,
      newProfile: profileMock.profile
    };
    expect(reducer(initialState, updateProfileAction).isFetching).toEqual(false);
    expect(reducer(initialState, updateProfileAction).method).toEqual('PUT');
    expect(reducer(initialState, updateProfileAction).payload)
      .toEqual(profileMock.profile);
  });

  it('should handle UPDATE_USER_PROFILE_FAILED action type', () => {
    const updateProfileFailedAction = {
      type: types.UPDATE_USER_PROFILE_FAILED,

    };
    expect(reducer(initialState, updateProfileFailedAction).isFetching)
      .toEqual(false);
    expect(reducer(initialState, updateProfileFailedAction).method).toEqual('PUT');
    expect(reducer(initialState, updateProfileFailedAction).payload).toEqual({});
  });
});
