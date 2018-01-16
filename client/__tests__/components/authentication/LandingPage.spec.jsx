import React from 'react';
import expect from 'expect';
import { shallow } from 'enzyme';
import { LandingPage } from '../../../authentication/containers/LandingPage';

const props = {
  Authentication: {
    isAuthenticated: false
  }
};

describe('<LandingPage />', () => {
  it('renders without exploding', () => {
    const wrapper = shallow(<LandingPage {...props} />);
    expect(wrapper).toBeDefined();
    expect(wrapper.length).toBe(1);
    expect(wrapper.find('div').length).toBe(6);
  });

  it('should contain a Signup/Login links', () => {
    const wrapper = shallow(<LandingPage {...props} />);
    expect(wrapper.find('Link').length).toBe(2);
  });

  it('should contain quoted text', () => {
    const wrapper = shallow(<LandingPage {...props} />);
    expect(wrapper.find('.quote-text').length).toBe(1);
  });
});
