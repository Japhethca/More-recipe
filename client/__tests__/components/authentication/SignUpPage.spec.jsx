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
  it('renders without exploding', () => {
    const wrapper = shallow(<SignupPage {...props} />);
    expect(wrapper).toBeDefined();
    expect(wrapper.length).toBe(1);
    expect(wrapper.find('div').length).toBe(1);
  });


  it('should render a SignupForm', () => {
    const wrapper = shallow(<SignupPage {...props} />);
    expect(wrapper.find('SignupForm').length).toBe(1);
  });

  it('should alter state when change is simulated', () => {
    const wrapper = shallow(<SignupPage {...props} {...state} />);
    wrapper.find('SignupForm').simulate('change', event);
    expect(wrapper.instance().state.email).toBe('example@gmail.com')
  });

  it('should simulate form submission', () => {
    const wrapper = shallow(<SignupPage {...props} {...state} />);
    const handleRequestSpy = jest.spyOn(wrapper.instance().props, 'handleAuthRequest');
    wrapper.instance().setState({...state})
    wrapper.find('SignupForm').simulate('submit', event);
    expect(handleRequestSpy).toHaveBeenCalled();
  });

  it('should redirect authenticated users', () => {
    const wrapper = shallow(<SignupPage {...props} {...state} />);
    wrapper.setProps({...props, authentication: {isAuthenticated: true}})
    expect(wrapper.find('Redirect').length).toEqual(1);
  });

  it('should return validation errors if inputs fields are empty', () => {
    const newState = {email: '', password: '', validationErrors: {}};
    const wrapper = shallow(<SignupPage {...props} {...newState} />);
    wrapper.find('SignupForm').simulate('submit', event);
    expect(wrapper.instance().state.validationErrors).toBeDefined();
  });
});
