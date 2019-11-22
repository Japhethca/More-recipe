import React from 'react';
import expect from 'expect';
import { shallow } from 'enzyme';
import { LandingPage } from '../../../authentication/containers/LandingPage';

const props = {
  authentication: {
    isAuthenticated: false
  }
};

describe('<LandingPage />', () => {
  it('should render without exploding', () => {
    const wrapper = shallow(<LandingPage {...props} />);
    expect(wrapper).toBeDefined();
    expect(wrapper.length).toBe(1);
    expect(wrapper.find('div').length).toBe(6);
    expect(wrapper.find('Link').length).toBe(2);
  });

  it('should render quoted text', () => {
    const wrapper = shallow(<LandingPage {...props} />);
    expect(wrapper.find('.quote-text').length).toBe(1);
    expect(wrapper.find('.quote-text')
      .text()).toBe('Find and Share Best and Exciting Recipes');
  });

  it('should redirect authenticated users', () => {
    const wrapper = shallow(<LandingPage {...props} />);
    wrapper.setProps({ ...props, authentication: { isAuthenticated: true } });
    expect(wrapper.find('Redirect').length).toEqual(1);
  });
});
