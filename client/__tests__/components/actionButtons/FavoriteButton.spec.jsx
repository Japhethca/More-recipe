import React from 'react';
import expect from 'expect';
import { shallow } from 'enzyme';
import FavoriteButton from '../../../ActionButtons/components/FavoriteButton';

const props = {
  isInFavorites: jest.fn(() => true),
  onFavoriteClick: jest.fn()
};

describe('<FavoriteButton />', () => {
  it('renders without exploding', () => {
    const wrapper = shallow(<FavoriteButton {...props} />);
    expect(wrapper).toBeDefined();
  });

  it('should contain a button element', () => {
    const wrapper = shallow(<FavoriteButton {...props} />);
    expect(wrapper.find('button').length).toBe(1);
    expect(wrapper.find('button').parent().is('div')).toBe(true);
  });

  it('should have a ".action-btns" class', () => {
    const wrapper = shallow(<FavoriteButton {...props} />);
    expect(wrapper.hasClass('action-btns')).toBe(true);
  });

  it('should have a material icon', () => {
    const wrapper = shallow(<FavoriteButton {...props} />);
    expect(wrapper.find('i').hasClass('material-icons')).toBe(true);
  });

  it('should simulate click event', () => {
    const wrapper = shallow(<FavoriteButton {...props} />);
    wrapper.simulate('click');
    expect(wrapper.find('button').hasClass('favorite')).toBe(true);
  });
});
