import React from 'react';
import { shallow } from 'enzyme';
import { SearchForm } from '../../../SearchPage/components/SearchForm';

const props = {
  history: {
    push: jest.fn(),
    location: {
      search: 'recipe'
    }
  },
  handleSearch: jest.fn(),
};

const event = {
  preventDefault: jest.fn(),
  target: {
    value: 'query'
  }
};


describe('<SearchForm />', () => {
  it('renders without exploding', () => {
    const wrapper = shallow(<SearchForm {...props} />);
    expect(wrapper).toBeDefined();
    expect(wrapper.length).toBe(1);
    expect(wrapper.find('div').length).toBe(2);
    expect(wrapper.find('form').length).toBe(1);
    expect(wrapper.find('input').length).toBe(1);
  });

  it('should simulate search input change', () => {
    const wrapper = shallow(<SearchForm {...props} />);

    wrapper.find('input').simulate('change', event);
    expect(wrapper.instance().state.query).toEqual('query');
  });

  it('should simulate search submission', () => {
    const wrapper = shallow(<SearchForm {...props} />);

    wrapper.find('form').simulate('submit', event);
    expect(wrapper.instance().props.handleSearch).toHaveBeenCalled();
  });
});
