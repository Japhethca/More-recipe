import React from 'react';
import expect from 'expect';
import { shallow } from 'enzyme';
import ListReviews from '../../../Reviews/components/ListReviews';
import mockData from '../../__mock__/mockData';


const props = {
  reviews: [mockData.Review]
};

describe('<ListReviews /> ', () => {
  it('should mount without exploding', () => {
    const wrapper = shallow(<ListReviews {...props} />);
    expect(wrapper).toBeDefined();
    expect(wrapper.find('h4').length).toBe(1);
  });

  it('should have a ".review-list" class', () => {
    const wrapper = shallow(<ListReviews {...props} />);
    expect(wrapper.find('.review-list').length).toBe(1);
  });

  it('should have a Review component', () => {
    const wrapper = shallow(<ListReviews {...props} />);
    expect(wrapper.find('Review').length).toBe(1);
  });
  it('should match match snapshot', () => {
    const wrapper = shallow(<ListReviews {...props} />);
    expect(toJson(wrapper)).toMatchSnapshot();
  });
});

