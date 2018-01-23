import React from 'react';
import { shallow } from 'enzyme';
import { HomePage } from '../../../HomePage/containers/HomePage';
import mockData from '../../__mock__/mockData';

const props = {
  recipes: {
    payload: mockData.recipes,
    isFetching: false
  },
  history: {
    location: { search: '' },
    push: jest.fn()
  },
  handleGetFavorites: jest.fn(),
  getAllRecipes: jest.fn(),
};

const state = {
  userRecipes: {
    payload: mockData.recipes,
    isFetching: false
  },
  page: ''
};


describe('<HomePage />', () => {
  describe('homePage component', () => {
    it('should render without exploding', () => {
      const wrapper = shallow(<HomePage {...props} />);
      expect(wrapper).toBeDefined();
      expect(wrapper.length).toBe(1);
      expect(wrapper.find('div').length).toBe(3);
      expect(wrapper.hasClass('home-page')).toBe(true);
      expect(wrapper.find('Recipes').length).toBe(1);
      expect(wrapper.find('Pagination').length).toBe(1);
    });
  });

  describe('componentDidMount', () => {
    it('should call getAllRecipes to get latest recipes', () => {
      const wrapper = shallow(<HomePage {...props} />);
      wrapper.setProps({ ...props, recipes: { payload: [mockData.recipe] } });
      wrapper.instance().componentDidMount();
      expect(wrapper.instance().props.getAllRecipes).toHaveBeenCalled();
      expect(wrapper.instance().props.recipes.payload).toEqual([mockData.recipe]);
    });

    it('should call handleGetFavorites to get users favorites recipes', () => {
      const wrapper = shallow(<HomePage {...props} />);
      wrapper.instance().componentDidMount();
      expect(wrapper.instance().props.handleGetFavorites).toHaveBeenCalled();
    });

    it('should be rendered with current recipes list', () => {
      const wrapper = shallow(<HomePage {...props} />);
      expect(wrapper.instance().props.recipes).toBe(props.recipes);
    });
  });

  describe('componentWillReceiveProps', () => {
    it('should receive new latest recipes', () => {
      const wrapper = shallow(<HomePage {...props} {...state} />);
      const componentWillReceivePropSpy = jest
        .spyOn(wrapper.instance(), 'componentWillReceiveProps');

      wrapper.setProps({ ...props, recipes: { payload: [], isFetching: true } });
      expect(componentWillReceivePropSpy).toHaveBeenCalled();
    });
  });

  describe('handlePagination', () => {
    it('should handle pagination click', () => {
      const wrapper = shallow(<HomePage {...props} />);
      wrapper.instance().handlePagination({ selected: 1 });
      expect(wrapper.instance().props.getAllRecipes).toHaveBeenCalledWith(2);
    });
  });
});
