import React from 'react';
import { shallow } from 'enzyme';
import Button from '../../../common/Button';

const props = {
  text: 'submit',
  type: '',
  className: '',
  textColor: '',
  backgroundColor: '',
};

describe('<Button /> ', () => {
  it('renders without exploding', () => {
    const wrapper = shallow(<Button {...props} />);
    expect(wrapper).toBeDefined();
    expect(wrapper.find('div').length).toBe(1);
    expect(wrapper.find('button').length).toEqual(1);
    expect(wrapper.find('button').text()).toBe('submit');
  });
});

