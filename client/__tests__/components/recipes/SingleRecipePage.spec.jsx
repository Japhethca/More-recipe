import React from 'react';
import { shallow } from 'enzyme';
import { SingleRecipePage } from '../../../Recipes/containers/SingleRecipePage';
import mockData from '../../__mock__/mockData';

const props = {
  recipe: {
    payload: mockData.recipe,
    notFound: false
  },
  match: {
    params: {
      nameId: 'thisisi-lst-43'
    }
  },
  history: {
    push: jest.fn()
  },
  getSingleRecipe: jest.fn(),
};

const state = {
  recipe: {
    payload: mockData.recipe
  }
};
describe('<SingleRecipePage />', () => {
  describe('SingleRecipePage Component', () => {
    it('should render without exploding', () => {
      const wrapper = shallow(<SingleRecipePage {...props} />);
      expect(wrapper).toBeDefined();
      expect(wrapper.length).toBe(1);
      expect(wrapper.find('div').length).toBe(1);
      expect(wrapper.find('SingleRecipe').length).toBe(1);
    });
  });


  describe('getSingleRecipe', () => {
    it('should called to get single recipe details', () => {
      const wrapper = shallow(<SingleRecipePage {...props} />);
      const componentDidMountSpy = jest
        .spyOn(wrapper.instance(), 'componentDidMount');
      wrapper.setProps({ ...props, recipe: { payload: [] } });
      wrapper.instance().componentDidMount();
      expect(componentDidMountSpy).toHaveBeenCalled();
      expect(wrapper.instance().props.getSingleRecipe).toHaveBeenCalled();
    });
  });

  describe('componentWillReceiveProps', () => {
    it('should update recipe data when new props arrives', () => {
      const wrapper = shallow(<SingleRecipePage {...props} {...state} />);
      const componentWillReceivePropSpy = jest
        .spyOn(wrapper.instance(), 'componentWillReceiveProps');
      const newProps = {
        recipe: {
          payload: {},
          created: true
        },
        getSingleRecipe: jest.fn(),
      };
      wrapper.setProps({ ...newProps });
      expect(componentWillReceivePropSpy).toHaveBeenCalled();
      expect(wrapper.instance().state.recipe).toEqual(newProps.recipe);
    });
  });
});
