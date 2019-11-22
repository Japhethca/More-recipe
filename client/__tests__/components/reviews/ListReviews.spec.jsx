import React from 'react';
import expect from 'expect';
import { shallow } from 'enzyme';
import ListReviews from '../../../Reviews/components/ListReviews';
import mockData from '../../__mock__/mockData';


const props = {
  reviews: [mockData.Review]
};

describe('<ListReviews /> ', () => {
  it('should render without exploding', () => {
    const wrapper = shallow(<ListReviews {...props} />);
    expect(wrapper).toBeDefined();
    expect(wrapper.find('h4').length).toBe(1);
    expect(wrapper.find('.review-list').length).toBe(1);
    expect(wrapper.find('Review').length).toBe(1);
  });

  it('should match snapshot', () => {
    const wrapper = shallow(<ListReviews {...props} />);
    expect(toJson(wrapper)).toMatchSnapshot();
  });
});

