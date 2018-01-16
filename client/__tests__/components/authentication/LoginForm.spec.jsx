import React from 'react';
import expect from 'expect';
import { shallow } from 'enzyme';
import LoginForm from '../../../authentication/components/LoginForm';

const props = {
  validationErrors: {},
  serverErrors: '',
  onChange: jest.fn(),
  onSubmit: jest.fn(),
  formData: {
    email: 'email.@gmail.com',
    password: 'password'
  },
  isFetching: false
};

describe('<LoginForm />', () => {
  it('renders without exploding', () => {
    const wrapper = shallow(<LoginForm {...props} />);
    expect(wrapper).toBeDefined();
    expect(wrapper.length).toBe(1);
    expect(wrapper.find('div').length).toBe(8);
  });

  it('should contain a TextField and Button element', () => {
    const wrapper = shallow(<LoginForm {...props} />);
    expect(wrapper.find('TextField').length).toBe(2);
    expect(wrapper.find('button').length).toBe(1);
  });

  it('should contain a Signup link', () => {
    const wrapper = shallow(<LoginForm {...props} />);
    expect(wrapper.find('Link').length).toBe(1);
  });
});
