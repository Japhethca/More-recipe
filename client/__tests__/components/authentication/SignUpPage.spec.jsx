import React from 'react';

import { shallow } from 'enzyme';
import { SignupPage } from '../../../authentication/containers/SignupPage';

const props = {
  authentication: { isAuthenticated: false },
  handleAuthRequest: jest.fn(),
  loader: { isFetching: false }
};

const event = {
  preventDefault: jest.fn(),
  target: {
    name: 'email',
    value: 'example@gmail.com'
  }
};

const state = {
  username: 'name',
  email: 'name@gmail.com',
  password: '1234567',
  verifyPassword: '1234567',
  validationErrors: {}
};

describe('<SignupPage />', () => {
  describe('SignupPage component', () => {
    it('should render without exploding', () => {
      const wrapper = shallow(<SignupPage {...props} />);
      expect(wrapper).toBeDefined();
      expect(wrapper.length).toBe(1);
      expect(wrapper.find('div').length).toBe(1);
    });

    it('should render a SignupForm', () => {
      const wrapper = shallow(<SignupPage {...props} />);
      expect(wrapper.find('SignupForm').length).toBe(1);
    });
  });

  describe('onChange', () => {
    it(
      'should change state for email when a user types on the email field',
      () => {
        const wrapper = shallow(<SignupPage {...props} {...state} />);
        wrapper.find('SignupForm').simulate('change', event);
        expect(wrapper.instance().state.email).toBe('example@gmail.com');
      }
    );
  });

  describe('onSubmit()', () => {
    it('should handle form submission when the form inputs are valid', () => {
      const wrapper = shallow(<SignupPage {...props} {...state} />);
      const handleRequestSpy = jest
        .spyOn(wrapper.instance().props, 'handleAuthRequest');
      wrapper.instance().setState({ ...state });
      wrapper.find('SignupForm').simulate('submit', event);
      expect(handleRequestSpy).toHaveBeenCalled();
      expect(wrapper.instance().state.username).toBe('name');
      expect(wrapper.instance().state.email).toBe('name@gmail.com');
    });

    it(
      'should show validation errors when required form fields are empty',
      () => {
        const newState = {
          email: '',
          password: '',
          validationErrors: { }
        };
        const wrapper = shallow(<SignupPage {...props} {...newState} />);
        wrapper.find('SignupForm').simulate('submit', event);
        expect(wrapper.instance().state.validationErrors.email)
          .toEqual(['The email field is required.']);
        expect(wrapper.instance().state.validationErrors.password)
          .toEqual(['The password field is required.']);
      }
    );
  });
  describe('Redirect', () => {
    it(
      'should redirect authenticated users to the homeopage ' +
      'when accessing the signupt route',
      () => {
        const wrapper = shallow(<SignupPage {...props} {...state} />);
        wrapper.setProps({ ...props, authentication: { isAuthenticated: true } });
        expect(wrapper.find('Redirect').length).toEqual(1);
      }
    );
  });
});
