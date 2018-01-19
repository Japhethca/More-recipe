import React from 'react';
import expect from 'expect';
import { shallow } from 'enzyme';
import Footer from '../../../common/Footer';

describe('<Footer /> ', () => {
  it('should mount without exploding', () => {
    const wrapper = shallow(<Footer />);
    expect(wrapper).toBeDefined();
    expect(wrapper.find('div').length).toBe(1);
  });

  it('should render a footer text', () => {
    const wrapper = shallow(<Footer />);
    expect(wrapper.find('p')
      .text()).toBe('© 2017 More Recipes Designed By Chidex');
  });
});

