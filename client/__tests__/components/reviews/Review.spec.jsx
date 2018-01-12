import React from 'react';
import expect from 'expect';
import { shallow } from 'enzyme';
import Review from '../../../Reviews/components/Review';
import recipesMock from '../../__mock__/recipesMock';


const props = {
  review: recipesMock.Review
};

describe('<Review /> ', () => {
  it('should mount without exploding', () => {
    const wrapper = shallow(<Review {...props} />);
    expect(wrapper).toBeDefined();
    expect(wrapper.find('p').length).toBe(1);
  });

  it('should have a ".review-content" class', () => {
    const wrapper = shallow(<Review {...props} />);
    expect(wrapper.find('.review-content').length).toBe(1);
    expect(wrapper.hasClass('single-review')).toBe(true);
  });
  it('should match match snapshot', () => {
    const wrapper = shallow(<Review {...props} />);
    expect(toJson(wrapper)).toMatchSnapshot();
  });
});

