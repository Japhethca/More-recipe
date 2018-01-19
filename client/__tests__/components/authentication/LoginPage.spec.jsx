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
  it('renders without exploding', () => {
    const wrapper = shallow(<LoginPage {...props} />);
    expect(wrapper).toBeDefined();
    expect(wrapper.length).toBe(1);
    expect(wrapper.find('div').length).toBe(1);
    expect(wrapper.find('LoginForm').length).toBe(1);
  });

  it('should change email state when change is simulated', () => {
    const wrapper = shallow(<LoginPage {...props} {...state} />);
    wrapper.find('LoginForm').simulate('change', event);
    expect(wrapper.instance().state.email).toBe('example@gmail.com')
  });

  it('should simulate submit event', () => {
    const wrapper = shallow(<LoginPage {...props} {...state} />);
    const handleRequestSpy = jest.spyOn(wrapper.instance().props, 'handleAuthRequest');
    wrapper.instance().setState({...state})
    wrapper.find('LoginForm').simulate('submit', event);
    expect(handleRequestSpy).toHaveBeenCalled();
  });

  it('should redirect authenticated users', () => {
    const wrapper = shallow(<LoginPage {...props} {...state} />);
    wrapper.setProps({...props, authentication: {isAuthenticated: true}})
    expect(wrapper.find('Redirect').length).toEqual(1);
  });

  it('should return validation errors if inputs fields are empty', () => {
    const newState = {email: '', password: '', validationErrors: {}};
    const wrapper = shallow(<LoginPage {...props} {...newState} />);
    wrapper.find('LoginForm').simulate('submit', event);
    expect(wrapper.instance().state.validationErrors).toBeDefined();
  });
});
