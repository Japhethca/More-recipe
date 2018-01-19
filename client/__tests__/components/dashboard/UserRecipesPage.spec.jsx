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
  it('renders without exploding', () => {
    const wrapper = shallow(<UserRecipesPage {...props} />);
    expect(wrapper).toBeDefined();
    expect(wrapper.length).toBe(1);
    expect(wrapper.find('div').length).toBe(1);
    expect(wrapper.find('Recipes').length).toBe(1);
  });

  it('should have a Recipes component', () => {
    const wrapper = shallow(<UserRecipesPage {...props} />);
  });

  it('should render with a valid props', () => {
    const wrapper = shallow(<UserRecipesPage {...props} />);
    expect(wrapper.instance().props.userRecipes).toBe(props.userRecipes);
  });

  it('should receive user recipes list', () => {
    const wrapper = shallow(<UserRecipesPage {...props} {...state} />);
    const componentWillReceivePropSpy = jest
      .spyOn(wrapper.instance(), 'componentWillReceiveProps');
    const newProps = {
      userRecipes: {
        payload: [],
        isFetching: true
      },
      handleGetUserRecipes: jest.fn(),
    };
    wrapper.setProps({ ...newProps });
    expect(componentWillReceivePropSpy).toHaveBeenCalled();
    expect(wrapper.instance().props.userRecipes.payload).toEqual([])
  });

  it('should render with user Recipes on mount', () => {
    const wrapper = shallow(<UserRecipesPage {...props} />);
    const componentDidMountSpy = jest
      .spyOn(wrapper.instance(), 'componentDidMount');
    wrapper.setProps({ ...props, userRecipes: { payload: [] } });
    wrapper.instance().componentDidMount();
    expect(componentDidMountSpy).toHaveBeenCalled();
    expect(wrapper.instance().props.handleGetUserRecipes).toHaveBeenCalled();
  });
});
