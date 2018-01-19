import React from 'react';
import { shallow } from 'enzyme';
import { RecipeCard } from '../../../Recipes/containers/RecipeCard';
import mockData from '../../__mock__/mockData';
import sweetalert from 'sweetalert';

jest.mock('../../../utilities/slugify.js');
swal = jest.mock('sweetalert');

swal.then = (funct) => funct(true);


const props = {
  recipe: {
    payload: mockData.recipe
  },
  history: {
    push: jest.fn()
  },
  handleDeleteRecipe: jest.fn(),
  handleRemoveFromFavorites: jest.fn(),
  showModifyButtons: true,
  showActionBtns: true,
  showRemoveFavorite: true,

};

const state = {
  recipe: {}
};


describe('<RecipeCard />', () => {
  it('renders without exploding', () => {
    const wrapper = shallow(<RecipeCard {...props} />);
    expect(wrapper).toBeDefined();
    expect(wrapper.length).toBe(1);
  });

  it('should render with a props', () => {
    const wrapper = shallow(<RecipeCard {...props} />);
    expect(wrapper.instance().props.recipe).toBe(props.recipe);
  });

  it('should call componentwillrecieveProps when new props arrive', () => {
    const wrapper = shallow(<RecipeCard {...props} {...state} />);
    const componentWillReceivePropSpy = jest
      .spyOn(wrapper.instance(), 'componentWillReceiveProps');
    wrapper.setProps({ ...props, recipe: { payload: [] } });
    expect(componentWillReceivePropSpy).toHaveBeenCalled();
    expect(wrapper.instance().props.recipe).toEqual({ payload: [] });
  });

  it('should remove recipe from favorites', () => {
    const wrapper = shallow(<RecipeCard {...props} {...state} />);
    const onRemoveFavoriteClickSpy = jest
      .spyOn(wrapper.instance(), 'onRemoveFavoriteClick');
  
    wrapper.instance().onRemoveFavoriteClick();
    expect(onRemoveFavoriteClickSpy).toHaveBeenCalled();
  });


  it('should call handleDeleteClick action to delete recipe', () => {
    const wrapper = shallow(<RecipeCard {...props} {...state} />);
    const handleDeleteClickSpy = jest
      .spyOn(wrapper.instance(), 'handleDeleteClick');

    wrapper.instance().handleDeleteClick();
    expect(handleDeleteClickSpy).toHaveBeenCalled();
  });

  it('should simulate update recipe button click', () => {
    const wrapper = shallow(<RecipeCard {...props} {...state} />);
    wrapper.instance().handleUpdateClick();
    expect(wrapper.instance().props.history.push).toHaveBeenCalled();
  });
});
