import React from 'react';
// import expect from 'expect';
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
    value: 'value'
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
  });


  it('should contain a LoginForm', () => {
    const wrapper = shallow(<LoginPage {...props} />);
    expect(wrapper.find('LoginForm').length).toBe(1);
  });

  it('should call simulate onSubmit and onChange', () => {
    const wrapper = shallow(<LoginPage {...props} {...state} />);
    const onsubmitSpy = jest.spyOn(wrapper.instance(), 'onSubmit');
    const onChangeSpy = jest.spyOn(wrapper.instance(), 'onChange');
    wrapper.instance().onChange(event);
    wrapper.instance().onSubmit(event);
    expect(onsubmitSpy).toHaveBeenCalled();
    expect(onChangeSpy).toHaveBeenCalled();
  });
});
