import React from 'react';
import { shallow } from 'enzyme';
import { Pagination } from '../../../common/Pagination';

const props = {
  totalPages: 3,
  currentPage: 1,
  handlePagination: jest.fn()
};

const state = {
  totalPages: 3,
  currentPage: 1
};

describe('<Pagination />', () => {
  it('renders without exploding', () => {
    const wrapper = shallow(<Pagination {...props} {...state} />);
    expect(wrapper).toBeDefined();
    expect(wrapper.length).toBe(1);
    expect(wrapper.find('div').length).toBe(1);
  });

  it('should contain state and props', () => {
    const wrapper = shallow(<Pagination {...props} {...state} />);
    expect(wrapper.instance().props.totalPages).toEqual(3);
    expect(wrapper.instance().props.currentPage).toEqual(1);
    expect(wrapper.instance().state.totalPages).toEqual(3);
  });

  it('should receive new props', () => {
    const wrapper = shallow(<Pagination {...props} {...state} />);
    const componentWillRecievePropsSpy = jest.spyOn(wrapper.instance(), 'componentWillReceiveProps');
    wrapper.setProps({ totalPages: 4, currentPage: 2 });
    expect(componentWillRecievePropsSpy).toHaveBeenCalled();
    expect(wrapper.instance().props.totalPages).toEqual(4);
    expect(wrapper.instance().props.currentPage).toEqual(2);
    expect(wrapper.instance().state.totalPages).toEqual(4);
    expect(wrapper.instance().state.currentPage).toEqual(2);
  });
});
