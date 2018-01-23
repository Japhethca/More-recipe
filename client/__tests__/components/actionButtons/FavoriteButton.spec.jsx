import React from 'react';
import expect from 'expect';
import { shallow } from 'enzyme';
import FavoriteButton from '../../../ActionButtons/components/FavoriteButton';

const props = {
  isInFavorites: jest.fn(() => true),
  onFavoriteClick: jest.fn()
};

describe('<FavoriteButton />', () => {
  it('should render without exploding', () => {
    const wrapper = shallow(<FavoriteButton {...props} />);
    expect(wrapper.find('button').length).toBe(1);
    expect(wrapper.hasClass('action-btns')).toBe(true);
    expect(wrapper.find('i').hasClass('material-icons')).toBe(true);
    expect(wrapper).toBeDefined();
  });

  it(
    'should change icon color to red when recipe is ' +
    'added to favorites',
    () => {
      const wrapper = shallow(<FavoriteButton {...props} />);
      wrapper.simulate('click');
      expect(wrapper.find('button').hasClass('favorite')).toBe(true);
    }
  );
});
