import React from 'react';
import expect from 'expect';
import { shallow } from 'enzyme';
import NotFound from '../../../authentication/components/NotFound';

describe('<NotFound />', () => {
  it('renders without exploding', () => {
    const wrapper = shallow(<NotFound />);
    expect(wrapper).toBeDefined();
    expect(wrapper.length).toBe(1);
    expect(wrapper.find('div').length).toBe(1);
    expect(wrapper.hasClass('recipe-not-found')).toBe(true);
  });
});
