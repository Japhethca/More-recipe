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

// describe('PROFILE UPDATE actions', () => {
//   afterEach(() => {
//     mock.reset();
//     mock.restore();
//   });

//   it('creates EDIT_USER_PROFILE_START and EDIT_USER_PROFILE when updating profile has been done', () => {
//     mock.onPut('/api/users/profile', profileUpdateData)
//       .replyOnce(201, {
//         userData: profileMock.updateData,
//       });

//     const expectedActions = [
//       { type: types.EDIT_USER_PROFILE_START },
//       {
//         type: types.EDIT_USER_PROFILE,
//         profile: profileMock.updateData,
//       },
//     ];
//     const store = mockStore({});

//     store.dispatch(actions.handleEditUserProfile(profileUpdateData)).then(() => {
//       expect(store.getActions()).toEqual(expectedActions);
//     });
//   });

//   it('creates GET_USER_PROFILE_FAILED when an error occurs', () => {
//     mock.onGet('/api/users/profile')
//       .replyOnce(400, {
//         message: 'update Unsuccessful'
//       });

//     const expectedActions = [
//       { type: types.GET_USER_PROFILE_START },
//       {
//         type: types.GET_USER_PROFILE_FAILED,
//       }
//     ];
//     const store = mockStore({});

//     store.dispatch(actions.handleEditUserProfile(profileUpdateData));
//     expect(store.getActions()).toEqual(expectedActions);
//   });
// });

