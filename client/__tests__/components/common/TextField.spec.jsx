import React from 'react';
import { shallow } from 'enzyme';
import TextField from '../../../common/TextField';

const props = {
  name: '',
  value: '',
  onChange: jest.fn(),
  className: '',
  iconClassName: '',
  label: '',
  type: '',
  errorText: [],
  iconName: '',
  errorClass: '',
  placeholder: '',
  labelClass: ''
};

describe('<TextField /> ', () => {
  it('should mount without exploding', () => {
    const wrapper = shallow(<TextField {...props} />);
    expect(wrapper).toBeDefined();
    expect(wrapper.find('div').length).toBe(1);
  });

  it('should have an input and label elements', () => {
    const wrapper = shallow(<TextField {...props} />);
    expect(wrapper.find('input').length).toEqual(1);
    expect(wrapper.find('label').length).toEqual(1);
  });
});

