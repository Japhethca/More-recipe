import React from 'react';
import expect from 'expect';
import { shallow } from 'enzyme';
import Recipes from '../../../Recipes/components/Recipes';

const props = {
  recipes: [{}],
  showActionBtns: true,
  showModifyButtons: false,
  showRemoveFavorite: true,
  className: '',
};

describe('<Recipes />', () => {
  it('renders without exploding', () => {
    const wrapper = shallow(<Recipes {...props} />);
    expect(wrapper).toBeDefined();
    expect(wrapper.length).toBe(1);
    expect(wrapper.find('div').length).toBe(1);
    expect(wrapper.hasClass('recipe-list')).toBe(true);
  });

  it('should contain a ul and li elements', () => {
    const wrapper = shallow(<Recipes {...props} />);
    expect(wrapper.find('ul').length).toBe(1);
    expect(wrapper.find('li').length).toBe(1);
  });
});
