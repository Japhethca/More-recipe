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
  it('should render without exploding', () => {
    const wrapper = shallow(<SignupForm {...props} />);
    expect(wrapper).toBeDefined();
    expect(wrapper.length).toBe(1);
    expect(wrapper.find('div').length).toBe(10);
    expect(wrapper.find('TextField').length).toBe(4);
    expect(wrapper.find('button').length).toBe(1);
  });

  it('should show server error messages', () => {
    const wrapper = shallow(<SignupForm {...props} />);
    wrapper.setProps({ ...props, serverErrors: 'incorrect password' });
    expect(wrapper.find('.server-error-text')
      .find('span').text()).toBe('incorrect password');
  });

  it(
    'should display "Registering in" text on button when sign ' +
    'up requests are being handled',
    () => {
      const wrapper = shallow(<SignupForm {...props} />);
      wrapper.setProps({ ...props, isFetching: true });
      expect(wrapper.find('button').text()).toBe('Registering...');
    }
  );
});
