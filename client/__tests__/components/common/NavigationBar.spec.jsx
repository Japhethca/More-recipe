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
  describe('Navigationbar component', () => {
    it('should render without exploding', () => {
      const wrapper = shallow(<NavigationBar {...props} {...state} />);
      expect(wrapper).toBeDefined();
      expect(wrapper.length).toBe(1);
      expect(wrapper.find('nav').length).toBe(1);
      expect(wrapper.find('NavLink').length).toBe(12);
    });
  });

  describe('logout button', () => {
    it('should logout authenticated users when clicked', () => {
      const wrapper = shallow(<NavigationBar {...props} />);

      wrapper.find('.side-nav').find('button').simulate('click');
      expect(wrapper.instance().props.logout).toHaveBeenCalled();
      expect(wrapper.instance().props.history.push).toHaveBeenCalled();
    });
  });

  describe('search button', () => {
    it(
      'should toggle search input on/off when ' +
      'clicked on mobile devices',
      () => {
        const wrapper = shallow(<NavigationBar {...props} />);

        wrapper.find('.search-icon').find('button').simulate('click');
        expect(wrapper.instance().state.isSearching).toBe(true);
        wrapper.find('.search-icon').find('button').simulate('click');
        expect(wrapper.instance().state.isSearching).toBe(false);
      }
    );
  });
});
