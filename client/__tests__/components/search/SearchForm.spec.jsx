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
  });

  it('should contain input element', () => {
    const wrapper = shallow(<SearchForm {...props} />);
    expect(wrapper.find('input').length).toBe(1);
  });

  it('should have onChange and onSubmit handlers', () => {
    const wrapper = shallow(<SearchForm {...props} />);

    wrapper.instance().onChange(event);
    expect(wrapper.instance().state.query).toEqual('query');

    wrapper.instance().onSubmit(event);
    expect(wrapper.instance().props.handleSearch).toHaveBeenCalled();
  });
});
