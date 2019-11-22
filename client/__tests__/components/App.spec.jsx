import React from 'react';
import expect from 'expect';
import { shallow } from 'enzyme';
import App from '../../App';

const props = {
  location: {
    pathName: ''
  }
};

describe('<App />', () => {
  it('should render without exploding', () => {
    const wrapper = shallow(<App {...props} />);
    expect(wrapper).toBeDefined();
    expect(wrapper.length).toBe(1);
    expect(wrapper.find('div').length).toBe(2);
    expect(wrapper.find('Footer').length).toBe(1);
    expect(wrapper.find('Switch').length).toBe(1);
    expect(wrapper.find('Route').length).toBe(9);
  });
});
