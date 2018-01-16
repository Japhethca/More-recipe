import React from 'react';
import { shallow } from 'enzyme';
import { SearchResultPage } from '../../../SearchPage/containers/SearchPage';
import mockData from '../../__mock__/mockData';


const props = {
  history: {
    push: jest.fn(),
    location: {
      search: 'recipe'
    }
  },
  handleSearch: jest.fn(),
  results: {
    payload: mockData.recipes
  },
};

const state = {
  query: '',
  searchResults: {
    payload: mockData.recipes
  }
};

describe('<SearchResultPage />', () => {
  it('should renders without exploding', () => {
    const wrapper = shallow(<SearchResultPage {...props} />);
    expect(wrapper).toBeDefined();
    expect(wrapper.length).toBe(1);
    expect(wrapper.find('div').length).toBe(2);
    expect(wrapper.hasClass('container')).toBe(true);
  });

  it('should contain Recipes component', () => {
    const wrapper = shallow(<SearchResultPage {...props} />);
    expect(wrapper.find('Recipes').length).toBe(1);
  });

  it('should make API call when component mounts', () => {
    const wrapper = shallow(<SearchResultPage {...props} {...state} />);
    wrapper.instance().componentDidMount();
    expect(wrapper.instance().props.handleSearch).toHaveBeenCalled();
    expect(wrapper.instance().state.searchResults).toEqual(state.searchResults);
  });

  it('should receive new Props', () => {
    const wrapper = shallow(<SearchResultPage {...props} {...state} />);
    const componentWillReceivePropsSpy = jest.spyOn(wrapper.instance(), 'componentWillReceiveProps');
    const newHistory = {
      push: jest.fn(),
      location: {
        search: 'maggi'
      }
    };
    const newResults = { payload: mockData.favorites };
    wrapper.setProps({ history: newHistory, results: newResults });
    expect(componentWillReceivePropsSpy).toHaveBeenCalled();
  });
});
