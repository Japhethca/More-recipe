import React from 'react';
import expect from 'expect';
import { shallow } from 'enzyme';
import ReviewButton from '../../../ActionButtons/components/ReviewsButton';

const props = {
  reviews: 1,
  hidden: false
};

describe('<ReviewButton />', () => {
  it('should render without exploding', () => {
    const wrapper = shallow(<ReviewButton {...props} />);
    expect(wrapper.find('span').length).toBe(2);
    expect(wrapper.hasClass('action-btns')).toBe(true);
    expect(wrapper.find('i').hasClass('material-icons')).toBe(true);
    expect(wrapper).toBeDefined();
  });

  it('should have a value of 1', () => {
    const wrapper = shallow(<ReviewButton {...props} />);
    expect(wrapper.find('#reivews').text()).toEqual(' 1 ');
  });

  it('should update the number of reviews when a new review is added', () => {
    const wrapper = shallow(<ReviewButton {...props} />);
    wrapper.setProps({ reviews: 2 });
    expect(wrapper.find('#reivews').text()).toEqual(' 2 ');
  });

  it('should hide the review button when the "hidden" prop is set', () => {
    const wrapper = shallow(<ReviewButton {...props} />);
    wrapper.setProps({ hidden: true });
    expect(wrapper.find('.hide').length).toEqual(1);
  });
});
