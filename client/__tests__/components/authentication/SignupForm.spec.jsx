import React from 'react';
import expect from 'expect';
import { shallow } from 'enzyme';
import SignupForm from '../../../authentication/components/SignupForm';

const props = {
  validationErrors: {},
  serverErrors: '',
  onChange: jest.fn(),
  onSubmit: jest.fn(),
  formData: {
    email: 'email.@gmail.com',
    password: 'password',
    username: 'chidex',
    verifyPassword: 'password'
  },
  isFetching: false
};

describe('<SignupForm />', () => {
  it('renders without exploding', () => {
    const wrapper = shallow(<SignupForm {...props} />);
    expect(wrapper).toBeDefined();
    expect(wrapper.length).toBe(1);
    expect(wrapper.find('div').length).toBe(10);
  });

  it('should contain a TextField and Button element', () => {
    const wrapper = shallow(<SignupForm {...props} />);
    expect(wrapper.find('TextField').length).toBe(4);
    expect(wrapper.find('button').length).toBe(1);
  });
});
