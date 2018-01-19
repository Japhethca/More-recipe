import expect from 'expect';
import reducer from '../../authentication/reducer';
import * as types from '../../authentication/actionTypes';

const initialState = {
  isFetching: false,
  isAuthenticated: false,
  user: {},
  loginErrors: '',
  signupErrors: ''
};


describe('AUTHENCTICATION reducer', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual(initialState);
  });

  it('should handle SET_CURRENT_USER', () => {
    const userAuthSuccessAction = {
      type: types.SET_CURRENT_USER,
      user: { id: 1 }
    };
    expect(reducer(initialState, userAuthSuccessAction).isAuthenticated)
      .toEqual(true);
    expect(reducer(initialState, userAuthSuccessAction).user)
      .toEqual(userAuthSuccessAction.user);
  });

  it('should handle LOGIN_FAILED_ERRORS', () => {
    const loginFailedAction = {
      type: types.LOGIN_FAILED_ERRORS,
      errors: 'User does not exist'
    };
    expect(reducer(initialState, loginFailedAction).loginErrors)
      .toEqual('User does not exist');
  });

  it('should handle SIGNUP_FAILED_ERRORS', () => {
    const signupFailedAction = {
      type: types.SIGNUP_FAILED_ERRORS,
      errors: 'User with this Email/username already exists'
    };
    expect(reducer(initialState, signupFailedAction).signupErrors)
      .toEqual(signupFailedAction.errors);
  });
});
