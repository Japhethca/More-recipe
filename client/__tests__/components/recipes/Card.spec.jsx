import React from 'react';
import expect from 'expect';
import { shallow } from 'enzyme';
import Card from '../../../Recipes/components/Card';
import mockData from '../../__mock__/mockData';

const props = {
  onDeleteClick: jest.fn(),
  onUpdateClick: jest.fn(),
  onRemoveFavoriteClick: jest.fn(),
  recipe: mockData.recipe,
  showActionBtns: true,
  showModifyButtons: false,
  showRemoveFavorite: true
};

describe('<Card />', () => {
  it('should render without exploding', () => {
    const wrapper = shallow(<Card {...props} />);
    expect(wrapper).toBeDefined();
    expect(wrapper.length).toBe(1);
    expect(wrapper.find('#recipe-card').length).toBe(1);
    expect(wrapper.find('div').length).toBe(4);
    expect(wrapper.find('button').length).toBe(1);
    expect(wrapper.find('Link').length).toBe(1);
  });
});
