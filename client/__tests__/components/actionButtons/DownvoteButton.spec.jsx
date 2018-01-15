import React from 'react';
import expect from 'expect';
import { shallow } from 'enzyme';
import DownvoteButton from '../../../ActionButtons/components/DownvoteButton';

const props = {
  downvotes: 2,
  downvote: jest.fn(() => {})
};

describe('<DownvoteButton />', () => {
  it('renders without exploding', () => {
    const wrapper = shallow(<DownvoteButton {...props} />);
    expect(wrapper).toBeDefined();
  });

  it('should contain a button element', () => {
    const wrapper = shallow(<DownvoteButton {...props} />);
    expect(wrapper.find('button').length).toBe(1);
  });

  it('should have a ".action-btns" class', () => {
    const wrapper = shallow(<DownvoteButton {...props} />);
    expect(wrapper.hasClass('action-btns')).toBe(true);
  });

  it('should have a material icon', () => {
    const wrapper = shallow(<DownvoteButton {...props} />);
    expect(wrapper.find('i').hasClass('material-icons')).toBe(true);
  });

  it('should have a title "Downvotes"', () => {
    const wrapper = shallow(<DownvoteButton {...props} />);
    expect(wrapper.prop('title')).toBe('Downvotes');
  });
});
