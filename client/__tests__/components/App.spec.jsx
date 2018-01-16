import React from 'react';
import expect from 'expect';
import { shallow } from 'enzyme';
import App from '../../App';


describe('<App />', () => {
  it('renders without exploding', () => {
    const wrapper = shallow(<App />);
    expect(wrapper).toBeDefined();
    expect(wrapper.length).toBe(1);
    expect(wrapper.find('div').length).toBe(2);
  });

  it('should contain a Footer element', () => {
    const wrapper = shallow(<App />);
    expect(wrapper.find('Footer').length).toBe(1);
  });

  it('should contain a Switch and Route element', () => {
    const wrapper = shallow(<App />);
    expect(wrapper.find('Switch').length).toBe(1);
    expect(wrapper.find('Route').length).toBe(8);
  });
});
