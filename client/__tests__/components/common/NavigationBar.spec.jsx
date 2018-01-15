import React from 'react';
import { shallow } from 'enzyme';
import { NavigationBar } from '../../../common/NavigationBar';

const props = {
  user: { isAuthenticated: true },
  logout: jest.fn(),
  history: { push: jest.fn() },
  bgColor: 'red',
};

const state = {
  isSearching: false
};

describe('<NavigationBar />', () => {
  it('renders without exploding', () => {
    const wrapper = shallow(<NavigationBar {...props} {...state} />);
    expect(wrapper).toBeDefined();
    expect(wrapper.length).toBe(1);
    expect(wrapper.find('nav').length).toBe(1);
  });

  it('should contain NavLink element', () => {
    const wrapper = shallow(<NavigationBar {...props} {...state} />);
    expect(wrapper.find('NavLink').length).toBe(12);
  });


  it('should handle logout', () => {
    const wrapper = shallow(<NavigationBar {...props} />);

    wrapper.instance().onClick();
    expect(wrapper.instance().props.logout).toHaveBeenCalled();
    expect(wrapper.instance().props.history.push).toHaveBeenCalled();
  });

  it('should handle search icon click on mobile', () => {
    const wrapper = shallow(<NavigationBar {...props} />);

    wrapper.instance().toggleSearch();
    expect(wrapper.instance().state.isSearching).toBe(true);
    wrapper.instance().toggleSearch();
    expect(wrapper.instance().state.isSearching).toBe(false);
  });
});
