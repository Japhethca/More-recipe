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
    payload: mockData.recipes
  }
};
describe('<SingleRecipePage />', () => {
  it('renders without exploding', () => {
    const wrapper = shallow(<SingleRecipePage {...props} />);
    expect(wrapper).toBeDefined();
    expect(wrapper.length).toBe(1);
    expect(wrapper.find('div').length).toBe(1);
  });

  it('should have a SingleRecipe component', () => {
    const wrapper = shallow(<SingleRecipePage {...props} />);
    expect(wrapper.find('SingleRecipe').length).toBe(1);
  });

  it('should have a valid props', () => {
    const wrapper = shallow(<SingleRecipePage {...props} />);
    expect(wrapper.instance().props.recipe).toBe(props.recipe);
  });

  it('should receive new props', () => {
    const wrapper = shallow(<SingleRecipePage {...props} {...state} />);
    const componentWillReceivePropSpy = jest.spyOn(wrapper.instance(), 'componentWillReceiveProps');
    const newProps = {
      recipe: {
        payload: [],
        created: true
      },
      getSingleRecipe: jest.fn(),
    };
    wrapper.setProps({ ...newProps });
    expect(componentWillReceivePropSpy).toHaveBeenCalled();
    expect(wrapper.instance().state.recipe).toEqual(newProps.recipe);
  });

  it('should get single recipe', () => {
    const wrapper = shallow(<SingleRecipePage {...props} />);
    const componentDidMountSpy = jest.spyOn(wrapper.instance(), 'componentDidMount');
    wrapper.setProps({ ...props, recipe: { payload: [] } });
    wrapper.instance().componentDidMount();
    expect(componentDidMountSpy).toHaveBeenCalled();
    expect(wrapper.instance().props.getSingleRecipe).toHaveBeenCalled();
  });
});
