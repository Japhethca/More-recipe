import React from 'react';
import { shallow } from 'enzyme';
import connectedActionButtons, { ActionButtons } from '../../../ActionButtons/containers/ActionButtons';
import recipeMock from '../../__mock__/recipesMock';
import mockStore from '../../__mock__/configMockStore';


const props = {
  hidden: false,
  recipe: recipeMock.recipe,
  handleUpvote: jest.fn(),
  handleDownvote: jest.fn(),
  handleAddToFavorites: jest.fn(),
  handleRemoveFromFavorites: jest.fn()
};

const store = mockStore({ favorites: recipeMock.recipes });
const state = {
  favorites: recipeMock.recipes
};


describe('<ActionButtons />', () => {
  it('renders without exploding', () => {
    const wrapper = shallow(<ActionButtons {...state} {...props} />);
    expect(wrapper).toBeDefined();
    expect(wrapper.length).toBe(1);
    expect(wrapper.find('ul').length).toBe(1);
    expect(wrapper.find('li').length).toBe(4);
  });

  it('should contain a <ReviewButton> element', () => {
    const wrapper = shallow(<ActionButtons {...state} {...props} />);
    expect(wrapper.find('ReviewButton').length).toBe(1);
  });

  it('should have a ".btn-list" class', () => {
    const wrapper = shallow(<ActionButtons {...state} {...props} />);
    expect(wrapper.find('ul').hasClass('btn-list')).toBe(true);
  });
  it('should match snapshots', () => {
    const wrapper = shallow(<ActionButtons {...state} {...props} />);
    expect(toJson(wrapper)).toMatchSnapshot();
  });
});
