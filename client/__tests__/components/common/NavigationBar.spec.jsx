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
    expect(wrapper.find('NavLink').length).toBe(12);
  });

  it('should logout user when logout button is clicked', () => {
    const wrapper = shallow(<NavigationBar {...props} />);

    wrapper.find('.side-nav').find('button').simulate('click');
    expect(wrapper.instance().props.logout).toHaveBeenCalled();
    expect(wrapper.instance().props.history.push).toHaveBeenCalled();
  });

  it('should toggles search when clicked', () => {
    const wrapper = shallow(<NavigationBar {...props} />);

    wrapper.find('.search-icon').find('button').simulate('click');
    expect(wrapper.instance().state.isSearching).toBe(true);
    wrapper.find('.search-icon').find('button').simulate('click');
    expect(wrapper.instance().state.isSearching).toBe(false);
  });
});
