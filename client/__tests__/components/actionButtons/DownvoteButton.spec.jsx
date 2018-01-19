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
    expect(wrapper.hasClass('action-btns')).toBe(true);
    expect(wrapper.find('i').hasClass('material-icons')).toBe(true);
    expect(wrapper.find('button').length).toBe(1);
    expect(wrapper.prop('title')).toBe('Downvotes');
    expect(wrapper).toBeDefined();
  });
});
