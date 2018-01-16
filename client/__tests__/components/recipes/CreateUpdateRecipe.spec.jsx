import React from 'react';
import { shallow } from 'enzyme';
import { CreateUpdateRecipe } from '../../../Recipes/containers/CreateUpdateRecipe';
import mockData from '../../__mock__/mockData';

const props = {
  recipe: {
    payload: mockData.recipe,
    created: false
  },
  handleGetUserRecipes: jest.fn(),
  handleCreateRecipe: jest.fn(),
  handleUpdateRecipe: jest.fn(),
  recipeUpdateData: mockData.recipe,
  title: '',
  type: 'create',
  loader: {
    isFetching: false
  }
};
const state = {
  id: 1,
  name: 'egusi soup',
  description: 'an african soup',
  ingredients: 'just cook it',
  direction: 'boil the melon',
  image: 'http://www.imagesite.com',
  validationErrors: {},
  recipe: {}
};

const event = {
  target: {
    name: 'name',
    value: 'a new recipe'
  },
  preventDefault: jest.fn()
};

describe('<CreateUpdateRecipe />', () => {
  it('renders without exploding', () => {
    const wrapper = shallow(<CreateUpdateRecipe {...props} />);
    expect(wrapper).toBeDefined();
    expect(wrapper.length).toBe(1);
    expect(wrapper.find('div').length).toBe(1);
  });

  it('should have a RecipeForm component', () => {
    const wrapper = shallow(<CreateUpdateRecipe {...props} />);
    expect(wrapper.find('RecipeForm').length).toBe(1);
  });

  it('should have a valid props', () => {
    const wrapper = shallow(<CreateUpdateRecipe {...props} />);
    expect(wrapper.instance().props.recipe).toBe(props.recipe);
  });

  it('should receive new props', () => {
    const wrapper = shallow(<CreateUpdateRecipe {...props} {...state} />);
    const componentWillReceivePropSpy = jest.spyOn(wrapper.instance(), 'componentWillReceiveProps');
    wrapper.setProps({ ...props, recipe: { payload: [], created: false } });
    expect(componentWillReceivePropSpy).toHaveBeenCalled();
    expect(wrapper.instance().props.recipe).toEqual({ payload: [], created: false });
  });

  it('should handle input change', () => {
    const wrapper = shallow(<CreateUpdateRecipe {...props} {...state} />);
    wrapper.instance().onChange(event);
    expect(wrapper.instance().state.name).toBe('a new recipe');
    const newEvent = {
      target: {
        name: 'image',
        files: [new Blob()]
      }
    };
    wrapper.instance().onChange(newEvent);
    expect(wrapper.instance().state.image).toEqual(new Blob());
    wrapper.instance().handleEditorChange({
      target:
      {
        targetElm: { name: 'direction' },
        getContent: () => 'just do it'
      }
    });
    expect(wrapper.instance().state.direction).toBe('just do it');
    wrapper.instance().handleEditorChange({
      target:
      {
        targetElm: { name: 'ingredients' },
        getContent: () => 'maggi'
      }
    });
    expect(wrapper.instance().state.ingredients).toBe('maggi');
  });

  it('should handle form submission', () => {
    const wrapper = shallow(<CreateUpdateRecipe {...props} {...state} />);
    wrapper.instance().onSubmit(event);
    expect(wrapper.instance().props.handleCreateRecipe).toHaveBeenCalled();
    wrapper.setProps({ type: 'update' });
    wrapper.instance().onSubmit(event);
    expect(wrapper.instance().props.handleUpdateRecipe).toHaveBeenCalled();
  });
});
