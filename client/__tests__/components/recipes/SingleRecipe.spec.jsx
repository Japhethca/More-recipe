import React from 'react';
import expect from 'expect';
import { shallow } from 'enzyme';
import SingleRecipe from '../../../Recipes/components/SingleRecipe';
import mockData from '../../__mock__/mockData';

const props = {
  recipe: mockData.recipe
};

describe('<SingleRecipe />', () => {
  it('renders without exploding', () => {
    const wrapper = shallow(<SingleRecipe {...props} />);
    expect(wrapper).toBeDefined();
    expect(wrapper.length).toBe(1);
    expect(wrapper.find('div').length).toBe(8);
    expect(wrapper.find('h4').length).toBe(3);
    expect(wrapper.find('img').length).toBe(1);
    expect(wrapper.hasClass('recipe-details')).toBe(true);
  });
});
