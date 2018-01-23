import React from 'react';
import expect from 'expect';
import { shallow } from 'enzyme';
import RecipeUpdatePage from '../../../Recipes/components/RecipeUpdatePage';

const props = {
  location: {
    state: true
  },
  history: {
    push: jest.fn()
  },
};

describe('<RecipeUpdatePage />', () => {
  it('should render without exploding', () => {
    const wrapper = shallow(<RecipeUpdatePage {...props} />);
    expect(wrapper).toBeDefined();
    expect(wrapper.length).toBe(1);
  });

  it('should redirect when there is not recipe update data', () => {
    const newProps = {
      location: {
        state: false
      },
      history: {
        push: jest.fn()
      },
    };
    const wrapper = shallow(<RecipeUpdatePage {...newProps} />);
    expect(wrapper).toBeDefined();
    expect(wrapper.length).toBe(1);
  });
});
