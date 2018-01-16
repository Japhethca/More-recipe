import React from 'react';
import { shallow } from 'enzyme';
import { ActionButtons } from '../../../ActionButtons/containers/ActionButtons';
import mockData from '../../__mock__/mockData';
import mockStore from '../../__mock__/configMockStore';


const props = {
  hidden: false,
  recipe: mockData.recipe,
  handleUpvote: jest.fn(),
  handleDownvote: jest.fn(),
  handleAddToFavorites: jest.fn(),
  handleRemoveFromFavorites: jest.fn()
};

const event = {
  preventDefault: jest.fn()
};

const store = mockStore({ favorites: mockData.recipes });
const state = {
  favorites: mockData.recipes
};


describe('<ActionButtons />', () => {
  it('renders without exploding', () => {
    const wrapper = shallow(<ActionButtons {...state} {...props} />);
    expect(wrapper).toBeDefined();
    expect(wrapper.length).toBe(1);
    expect(wrapper.find('div').length).toBe(1);
    expect(wrapper.find('ul').length).toBe(1);
    expect(wrapper.find('li').length).toBe(4);

    const inInfavoritesSpy = jest.spyOn(wrapper.instance(), 'isInFavorites');
    wrapper.instance().componentDidMount();

    expect(inInfavoritesSpy).toHaveBeenCalled();
  });

  it('should have a <ReviewButton> element', () => {
    const wrapper = shallow(<ActionButtons {...state} {...props} />);
    expect(wrapper.find('ReviewButton').length).toBe(1);
  });

  it('should have a ".btn-list" class', () => {
    const wrapper = shallow(<ActionButtons {...state} {...props} />);
    expect(wrapper.find('ul').hasClass('btn-list')).toBe(true);
  });

  it('should simulate downvote and upvote events', () => {
    const wrapper = shallow(<ActionButtons {...state} {...props} />);
    const upvoteSpy = jest.spyOn(wrapper.instance(), 'upvote');
    const downvoteSpy = jest.spyOn(wrapper.instance(), 'downvote');

    wrapper.instance().downvote(event);
    wrapper.instance().upvote(event);

    expect(upvoteSpy).toHaveBeenCalled();
    expect(downvoteSpy).toHaveBeenCalled();
  });

  it('should should simulate onFavoriteClick function call', () => {
    const wrapper = shallow(<ActionButtons {...state} {...props} />);
    const onFavoriteClickSpy = jest.spyOn(wrapper.instance(), 'onFavoriteClick');
    const isInFavoritesSpy = jest.spyOn(wrapper.instance(), 'isInFavorites');

    wrapper.instance().onFavoriteClick(event);
    expect(onFavoriteClickSpy).toHaveBeenCalled();
    expect(isInFavoritesSpy).toHaveBeenCalled();
  });

  it('should should receive new props', () => {
    const wrapper = shallow(<ActionButtons {...state} {...props} />);
    const componentWillReceivePropsSpy = jest.spyOn(wrapper.instance(), 'componentWillReceiveProps');
    const newProps = {
      favorites: mockData.favorites
    };
    wrapper.setProps({ ...newProps });
    expect(componentWillReceivePropsSpy).toHaveBeenCalled();
    expect(wrapper.instance().state.favorites).toBe(mockData.favorites);
  });
});
