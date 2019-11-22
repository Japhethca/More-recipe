import React from 'react';
import expect from 'expect';
import { shallow } from 'enzyme';
import Loader from '../../../common/Loader';


const props = {
  isFetching: true
};

describe('<Loader /> ', () => {
  it('should render component without exploding', () => {
    const wrapper = shallow(<Loader {...props} />);
    expect(wrapper).toBeDefined();
    expect(wrapper.find('div').length).toBe(1);
  });

  it('should match snapshot', () => {
    const wrapper = shallow(<Loader {...props} />);
    expect(toJson(wrapper)).toMatchSnapshot();
  });
});

