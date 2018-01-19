import React from 'react';
import { shallow } from 'enzyme';
import { Reviews } from '../../../Reviews/containers/Reviews';
import mockData from '../../__mock__/mockData';

const props = {
  recipe: mockData.recipe,
  handleAddNewRecipeReview: jest.fn(),
};

const state = {
  content: 'nice one'
};

const event = {
  target: {
    name: 'content',
    value: 'nice one'
  },
  preventDefault: jest.fn()
};

describe('<Reviews />', () => {
  it('renders without exploding', () => {
    const wrapper = shallow(<Reviews {...props} />);
    expect(wrapper).toBeDefined();
    expect(wrapper.length).toBe(1);
    expect(wrapper.find('div').length).toBe(1);
    expect(wrapper.hasClass('reviews-page')).toBe(true);
    expect(wrapper.find('ListReviews').length).toBe(1);
    expect(wrapper.find('AddReview').length).toBe(1);
  });

  it('should have a valid props', () => {
    const wrapper = shallow(<Reviews {...props} {...state} />);
    expect(wrapper.instance().props.recipe).toBe(props.recipe);
  });


  it('should set new state on input change', () => {
    const wrapper = shallow(<Reviews {...props} />);
    wrapper.find('AddReview').simulate('change', event);
    expect(wrapper.instance().state.content).toBe('nice one');
  });

  it('should simulate submit new reviews', () => {
    const wrapper = shallow(<Reviews {...props} />);
    wrapper.find('AddReview').simulate('submit', event);
    expect(wrapper.instance()
      .props.handleAddNewRecipeReview).toHaveBeenCalled();
  });
});
