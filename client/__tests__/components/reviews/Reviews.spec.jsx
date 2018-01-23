import React from 'react';
import { shallow } from 'enzyme';
import { Reviews } from '../../../Reviews/containers/Reviews';
import mockData from '../../__mock__/mockData';

const props = {
  recipe: mockData.recipe,
  handleAddNewRecipeReview: jest.fn(),
};


const event = {
  target: {
    name: 'content',
    value: 'nice one'
  },
  preventDefault: jest.fn()
};

describe('<Reviews />', () => {
  describe('Reviews Component', () => {
    it('should render without exploding', () => {
      const wrapper = shallow(<Reviews {...props} />);
      expect(wrapper).toBeDefined();
      expect(wrapper.length).toBe(1);
      expect(wrapper.find('div').length).toBe(1);
      expect(wrapper.hasClass('reviews-page')).toBe(true);
      expect(wrapper.find('ListReviews').length).toBe(1);
      expect(wrapper.find('AddReview').length).toBe(1);
    });
  });

  describe('onChange()', () => {
    it('should set new state when input change', () => {
      const wrapper = shallow(<Reviews {...props} />);
      wrapper.find('AddReview').simulate('change', event);
      expect(wrapper.instance().state.content).toBe('nice one');
    });
  });

  describe('onSubmit()', () => {
    it('should simulate new reviews submission', () => {
      const wrapper = shallow(<Reviews {...props} />);
      wrapper.find('AddReview').simulate('submit', event);
      expect(wrapper.instance()
        .props.handleAddNewRecipeReview).toHaveBeenCalled();
    });
  });
});
