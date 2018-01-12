import expect from 'expect';
import jwt from 'jsonwebtoken';
import axios from 'axios';

import mockStore, { mock } from '../__mock__/configMockStore';
import * as types from '../../authentication/actionTypes';
import * as actions from '../../authentication/actions';
import { setAuthorizationToken,
  isValidToken } from '../../authentication/helpers/setAuthorization';


const loginData = {
  email: 'andela@gmail.com',
  password: 'andela123',
};

const signupData = {
  username: 'chidex',
  email: 'andela@gmail.com',
  password: 'andela123',
  verifyPassword: 'andela123'
};

describe('LOGIN actions', () => {
  afterEach(() => {
    mock.reset();
    mock.restore();
  });

  it('dispatches SET_CURRENT_USER on successful login ', () => {
    const token = jwt.sign({ user: { id: 1 } }, 'shhhhh');

    mock.onPost('/api/users/signin', loginData)
      .replyOnce(200, {
        token
      });

    const expectedActions = [
      {
        type: types.SET_CURRENT_USER,
        user: jwt.decode(token),
      },
    ];
    const store = mockStore({});

    store.dispatch(actions.handleAuthRequest(loginData, 'login')).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  it('dispatches LOGIN_FAILED_ERRORS on failed authentication ', () => {
    mock.onPost('/api/users/signin', loginData)
      .replyOnce(400, {
        message: 'Invalid Credentials'
      });

    const expectedActions = [
      {
        type: types.LOGIN_FAILED_ERRORS,
        errors: 'Invalid Credentials'
      },
    ];
    const store = mockStore({});

    store.dispatch(actions.handleAuthRequest(loginData, 'login')).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });
});

describe('SINGNUP actions', () => {
  afterEach(() => {
    mock.reset();
    mock.restore();
  });

  it('dispatches SET_CURRENT_USER on successful Signup ', () => {
    const token = jwt.sign({ user: { id: 1 } }, 'shhhhh');

    mock.onPost('/api/users/signup', signupData)
      .replyOnce(200, {
        token
      });

    const expectedActions = [
      {
        type: types.SET_CURRENT_USER,
        user: jwt.decode(token),
      },
    ];
    const store = mockStore({});

    store.dispatch(actions.handleAuthRequest(loginData, 'signup')).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  it('dispatches SIGNUP_FAILED_ERRORS on failed authentication ', () => {
    mock.onPost('/api/users/signup', signupData)
      .replyOnce(409, {
        message: 'Email Already exists'
      });

    const expectedActions = [
      {
        type: types.SIGNUP_FAILED_ERRORS,
        errors: 'Email Already exists'
      },
    ];
    const store = mockStore({});

    store.dispatch(actions.handleAuthRequest(loginData, 'signup')).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });
});

describe('AUTHORIZATION HELPERS', () => {
  it('should return true if token is valid', () => {
    const token = jwt.sign({ user: { id: 1 } }, 'shhhhh');
    expect(isValidToken(token)).toBeTruthy();
  });

  it('should set token in authorization headers', () => {
    const token = jwt.sign({ user: { id: 1 } }, 'shhhhh');
    setAuthorizationToken(token);
    expect(axios.defaults.headers.common.token).toEqual(token);
  });
});
