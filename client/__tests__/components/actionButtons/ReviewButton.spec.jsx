import React from 'react';
import expect from 'expect';
import { shallow } from 'enzyme';
import ReviewButton from '../../../ActionButtons/components/ReviewsButton';

const props = {
  reviews: 1,
  hidden: false
};

describe('<ReviewButton />', () => {
  it('renders without exploding', () => {
    const wrapper = shallow(<ReviewButton {...props} />);
    expect(wrapper).toBeDefined();
  });

  it('should contain a span element', () => {
    const wrapper = shallow(<ReviewButton {...props} />);
    expect(wrapper.find('span').length).toBe(2);
  });

  it('should have a ".action-btns" class', () => {
    const wrapper = shallow(<ReviewButton {...props} />);
    expect(wrapper.hasClass('action-btns')).toBe(true);
  });

  it('should have a material icon', () => {
    const wrapper = shallow(<ReviewButton {...props} />);
    expect(wrapper.find('i').hasClass('material-icons')).toBe(true);
  });

  it('should have a value of 1', () => {
    const wrapper = shallow(<ReviewButton {...props} />);
    expect(wrapper.find('#reivews').text()).toEqual(' 1 ');
  });
});
