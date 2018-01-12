import React from 'react';
import expect from 'expect';
import { shallow } from 'enzyme';
import UpvoteButton from '../../../ActionButtons/components/UpvoteButton';

const props = {
  upvotes: 2,
  upvote: jest.fn(() => {})
};

describe('<UpvoteButton />', () => {
  it('renders without exploding', () => {
    const wrapper = shallow(<UpvoteButton {...props} />);
    expect(wrapper).toBeDefined();
  });

  it('should contain a button element', () => {
    const wrapper = shallow(<UpvoteButton {...props} />);
    expect(wrapper.find('button').length).toBe(1);
  });

  it('should have a ".action-btns" class', () => {
    const wrapper = shallow(<UpvoteButton {...props} />);
    expect(wrapper.hasClass('action-btns')).toBe(true);
  });

  it('should have a material icon', () => {
    const wrapper = shallow(<UpvoteButton {...props} />);
    expect(wrapper.find('i').hasClass('material-icons')).toBe(true);
  });

  it('should have a title "Upvotes"', () => {
    const wrapper = shallow(<UpvoteButton {...props} />);
    expect(wrapper.prop('title')).toBe('Upvotes');
  });
});
