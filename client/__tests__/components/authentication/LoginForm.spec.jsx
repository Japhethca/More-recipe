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
    expect(wrapper.find('TextField').length).toBe(2);
    expect(wrapper.find('button').length).toBe(1);
    expect(wrapper.find('Link').length).toBe(1);
  });

  it('should display server error messages', () => {
    const wrapper = shallow(<LoginForm {...props} />);
    wrapper.setProps({...props, serverErrors: 'incorrect password'})
    expect(wrapper.find('.server-error-text')
      .find('span').text()).toBe(' incorrect password ')
  });

  it('should display "loging in" on button when clikced', () => {
    const wrapper = shallow(<LoginForm {...props} />);
    wrapper.setProps({...props, isFetching: true})
    expect(wrapper.find('button').text()).toBe('Loging In...')
  });
});
