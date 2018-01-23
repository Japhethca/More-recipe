import React from 'react';
import { shallow } from 'enzyme';
import { LoginPage } from '../../../authentication/containers/LoginPage';

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
  email: 'name@gmail.com',
  password: '1234567'
};
describe('<LoginPage />', () => {
  describe('LoginPage component', () => {
    it('should render without exploding', () => {
      const wrapper = shallow(<LoginPage {...props} />);
      expect(wrapper).toBeDefined();
      expect(wrapper.length).toBe(1);
      expect(wrapper.find('div').length).toBe(1);
      expect(wrapper.find('LoginForm').length).toBe(1);
    });
  });

  describe('onChange()', () => {
    it('should change email state when an input is entered', () => {
      const wrapper = shallow(<LoginPage {...props} {...state} />);
      wrapper.find('LoginForm').simulate('change', event);
      expect(wrapper.instance().state.email).toBe('example@gmail.com');
    });
  });

  describe('onSubmit()', () => {
    it(
      'should handle login form submission when a user clicks on the submit button'
      , () => {
        const wrapper = shallow(<LoginPage {...props} {...state} />);
        const handleRequestSpy = jest
          .spyOn(wrapper.instance().props, 'handleAuthRequest');
        wrapper.instance().setState({ ...state });
        wrapper.find('LoginForm').simulate('submit', event);
        expect(handleRequestSpy).toHaveBeenCalled();
        expect(wrapper.instance().state.password).toBe('1234567');
        expect(wrapper.instance().state.email).toBe('name@gmail.com');
      }
    );

    it(
      'should show validation errors if inputs fields are ' +
      'empty during form submission',
      () => {
        const newState = { email: '', password: '', validationErrors: {} };
        const wrapper = shallow(<LoginPage {...props} {...newState} />);
        wrapper.find('LoginForm').simulate('submit', event);
        expect(wrapper.instance().state.validationErrors).toBeDefined();
        wrapper.find('LoginForm').simulate('submit', event);
        expect(wrapper.instance().state.validationErrors.email)
          .toEqual(['The email field is required.']);
        expect(wrapper.instance().state.validationErrors.password)
          .toEqual(['The password field is required.']);
      }
    );
  });
  describe('Redirect', () => {
    it(
      'should redirect authenticated users to the home page ' +
      'when accessing the login page',
      () => {
        const wrapper = shallow(<LoginPage {...props} {...state} />);
        wrapper.setProps({ ...props, authentication: { isAuthenticated: true } });
        expect(wrapper.find('Redirect').length).toEqual(1);
      }
    );
  });
});
