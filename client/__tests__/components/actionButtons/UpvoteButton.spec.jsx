import React from 'react';
import expect from 'expect';
import { shallow } from 'enzyme';
import UpvoteButton from '../../../ActionButtons/components/UpvoteButton';

const props = {
  upvotes: 2,
  upvote: jest.fn(() => {})
};

describe('<UpvoteButton />', () => {
  it('should render without exploding', () => {
    const wrapper = shallow(<UpvoteButton {...props} />);
    expect(wrapper.find('button').length).toBe(1);
    expect(wrapper.hasClass('action-btns')).toBe(true);
    expect(wrapper.find('i').hasClass('material-icons')).toBe(true);
    expect(wrapper.prop('title')).toBe('Upvotes');
    expect(wrapper).toBeDefined();
  });
});
