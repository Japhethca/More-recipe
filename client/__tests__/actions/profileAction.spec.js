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

describe('Profile', () => {
  describe('GET PROFILE actions', () => {
    it('dispatches GET_USER_PROFILE_START and GET_USER_PROFILE ' +
    'when fetching profile has been done', () => {
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

    it('dispatches GET_USER_PROFILE_FAILED when an error occurs', () => {
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
    it('dispatches UPDATE_USER_PROFILE_START and UPDATE_USER_PROFILE types when'
    + ' updating profile has been done', () => {
      mock.onPut('/api/users/profile', profileUpdateData)
        .replyOnce(201, {
          userData: profileMock.updateData,
          message: ''
        });

      const expectedActions = [
        { type: types.UPDATE_USER_PROFILE_START },
        {
          type: types.UPDATE_USER_PROFILE,
          newProfile: profileMock.updateData,
        },
      ];
      const store = mockStore({});

      store.dispatch(actions.handleUpdateUserProfile(profileUpdateData))
        .then(() => {
          expect(store.getActions()).toEqual(expectedActions);
        });
    });

    it(
      'dispatches UPDATE_USER_PROFILE_FAILED action type when an error occurs',
      () => {
        mock.onPut('/api/users/profile')
          .replyOnce(400, {
            message: 'update Unsuccessful'
          });

        const expectedActions = [
          { type: types.UPDATE_USER_PROFILE_START },
          {
            type: types.UPDATE_USER_PROFILE_FAILED,
          }
        ];
        const store = mockStore({});

        store.dispatch(actions.handleUpdateUserProfile(profileUpdateData))
          .then(() => {
            expect(store.getActions()).toEqual(expectedActions);
          });
      }
    );
  });

  describe('GET USER PROFILE ACTION CREATORS', () => {
    it('should return  GET_USER_PROFILE action type', () => {
      const expectedActions = profile => (
        {
          type: types.GET_USER_PROFILE,
          profile
        });
      expect(actions.getUserProfile('name')).toEqual(expectedActions('name'));
      expect(actions.getUserProfile('name')
        .type).toEqual(expectedActions('name').type);
    });

    it('should return  GET_USER_PROFILE_START action type', () => {
      const expectedActions = () => (
        {
          type: types.GET_USER_PROFILE_START,
        });
      expect(actions.getUserProfileStart().type)
        .toEqual(expectedActions().type);
    });

    it('should return  GET_USER_PROFILE_FAILED action type', () => {
      const expectedActions = () => (
        {
          type: types.GET_USER_PROFILE_FAILED,
        });
      expect(actions.getUserProfileFailed().type)
        .toEqual(expectedActions().type);
    });
  });

  describe('UPDATE USER PROFILE ACTION CREATORS', () => {
    it('should return  UPDATE_USER_PROFILE action type', () => {
      const expectedActions = newProfile => (
        {
          type: types.UPDATE_USER_PROFILE,
          newProfile
        });
      expect(actions.updateProfileAction('name')).toEqual(expectedActions('name'));
      expect(actions.updateProfileAction('name')
        .type).toEqual(expectedActions('name').type);
    });

    it('should return  UPDATE_USER_PROFILE_START action type', () => {
      const expectedActions = newProfile => (
        {
          type: types.UPDATE_USER_PROFILE_START,
          newProfile
        });
      expect(actions.updateProfileStartAction({})
        .type).toEqual(expectedActions({}).type);
    });

    it('should return  UPDATE_USER_PROFILE_FAILED action type', () => {
      const expectedActions = newProfile => (
        {
          type: types.UPDATE_USER_PROFILE_FAILED,
          newProfile
        });
      expect(actions.updateProfileFailedAction({})
        .type).toEqual(expectedActions({}).type);
    });
  });
});
