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
    value: 'value'
  }
};
const state = {
  username: 'name',
  email: 'name@gmail.com',
  password: '1234567',
  verifyPassword: '1234567',
};

describe('<SignupPage />', () => {
  it('renders without exploding', () => {
    const wrapper = shallow(<SignupPage {...props} />);
    expect(wrapper).toBeDefined();
    expect(wrapper.length).toBe(1);
    expect(wrapper.find('div').length).toBe(1);
  });


  it('should contain a SignupForm', () => {
    const wrapper = shallow(<SignupPage {...props} />);
    expect(wrapper.find('SignupForm').length).toBe(1);
  });

  it('should call simulate onSubmit and onChange', () => {
    const wrapper = shallow(<SignupPage {...props} {...state} />);
    const onsubmitSpy = jest.spyOn(wrapper.instance(), 'onSubmit');
    const onChangeSpy = jest.spyOn(wrapper.instance(), 'onChange');
    wrapper.instance().onChange(event);
    wrapper.instance().onSubmit(event);
    expect(onsubmitSpy).toHaveBeenCalled();
    expect(onChangeSpy).toHaveBeenCalled();
  });
});
