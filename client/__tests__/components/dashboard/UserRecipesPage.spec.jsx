import React from 'react';
import { shallow } from 'enzyme';
import { UserRecipesPage } from '../../../Dashboard/containers/UserRecipesPage';
import mockData from '../../__mock__/mockData';

const props = {
  userRecipes: {
    payload: mockData.recipes,
    isFetching: false
  },
  handleGetUserRecipes: jest.fn(),
};
const state = {
  userRecipes: {
    payload: mockData.recipes
  }
};

describe('<UserRecipesPage />', () => {
  describe('UserRecipesPage component', () => {
    it('should render without exploding', () => {
      const wrapper = shallow(<UserRecipesPage {...props} />);
      expect(wrapper).toBeDefined();
      expect(wrapper.length).toBe(1);
      expect(wrapper.find('div').length).toBe(1);
      expect(wrapper.find('Recipes').length).toBe(1);
    });

    it('should display users created recipes', () => {
      const wrapper = shallow(<UserRecipesPage {...props} />);
      expect(wrapper.instance().props.userRecipes).toBe(props.userRecipes);
    });
  });

  describe('handleGetUserRecipes()', () => {
    it('should be called to get users recipes', () => {
      const wrapper = shallow(<UserRecipesPage {...props} />);
      const componentDidMountSpy = jest
        .spyOn(wrapper.instance(), 'componentDidMount');
      wrapper.setProps({ ...props, userRecipes: { payload: [] } });
      wrapper.instance().componentDidMount();
      expect(componentDidMountSpy).toHaveBeenCalled();
      expect(wrapper.instance().props.handleGetUserRecipes).toHaveBeenCalled();
    });
  });

  describe('componentWillReceiveProps', () => {
    it('should update user recipes when a new recipe is created', () => {
      const wrapper = shallow(<UserRecipesPage {...props} {...state} />);
      const componentWillReceivePropSpy = jest
        .spyOn(wrapper.instance(), 'componentWillReceiveProps');
      const newProps = {
        userRecipes: {
          payload: [{ ...mockData.recipe }],
          isFetching: true
        },
        handleGetUserRecipes: jest.fn(),
      };
      wrapper.setProps({ ...newProps });
      expect(componentWillReceivePropSpy).toHaveBeenCalled();
      expect(wrapper.instance().props.userRecipes.payload[0])
        .toEqual(mockData.recipe);
    });
  });
});
