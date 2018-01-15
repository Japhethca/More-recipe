import React from 'react';
import { shallow } from 'enzyme';
import { Reviews } from '../../../Reviews/containers/Reviews';
import mockData from '../../__mock__/mockData';

const props = {
  recipe: mockData.recipe,
  handleRecipeReview: jest.fn(),
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
  });

  it('should have ListReviews and AddReview components', () => {
    const wrapper = shallow(<Reviews {...props} />);
    expect(wrapper.find('ListReviews').length).toBe(1);
    expect(wrapper.find('AddReview').length).toBe(1);
  });

  it('should have a valid props', () => {
    const wrapper = shallow(<Reviews {...props} {...state} />);
    expect(wrapper.instance().props.recipe).toBe(props.recipe);
  });


  it('should set new state', () => {
    const wrapper = shallow(<Reviews {...props} />);
    wrapper.instance().onChange(event);
    expect(wrapper.instance().state.content).toBe('nice one');
  });

  it('should submit new reviews', () => {
    const wrapper = shallow(<Reviews {...props} />);
    wrapper.instance().onSubmit(event);
    expect(wrapper.instance().props.handleRecipeReview).toHaveBeenCalled();
  });
});
