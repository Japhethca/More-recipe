import React from 'react';
import expect from 'expect';
import { shallow } from 'enzyme';
import RecipeForm from '../../../Recipes/components/RecipeForm';

const props = {
  recipe: {},
  validationErrors: [],
  onSubmit: jest.fn(),
  onChange: jest.fn(),
  handleEditorChange: jest.fn(),
  title: 'create recipe',
  isFetching: false
};

describe('<RecipeForm />', () => {
  it('renders without exploding', () => {
    const wrapper = shallow(<RecipeForm {...props} />);
    expect(wrapper).toBeDefined();
    expect(wrapper.length).toBe(1);
    expect(wrapper.find('div').length).toBe(9);
  });

  it('should contain a form and Button elements', () => {
    const wrapper = shallow(<RecipeForm {...props} />);
    expect(wrapper.find('form').length).toBe(1);
    expect(wrapper.find('button').length).toBe(1);
    expect(wrapper.find('input').length).toBe(3);
  });
});
