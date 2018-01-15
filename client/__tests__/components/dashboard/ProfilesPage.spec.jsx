import React from 'react';
import { shallow } from 'enzyme';
import { ProfilePage } from '../../../Dashboard/containers/ProfilePage';
import profileMock from '../../__mock__/profileMock';
import { start } from 'repl';

const props = {
  profile: {
    payload: profileMock.profile,
    isFetching: false
  },
  handleGetUserProfile: jest.fn(),
};
const state = {
  profile: {
    payload: profileMock.profile,
    isFetching: true
  },
};

describe('<ProfilePage />', () => {
  it('renders without exploding', () => {
    const wrapper = shallow(<ProfilePage {...props} />);
    expect(wrapper).toBeDefined();
    expect(wrapper.length).toBe(1);
    expect(wrapper.find('div').length).toBe(1);
  });

  it('should have a valid props', () => {
    const wrapper = shallow(<ProfilePage {...props} />);
    expect(wrapper.instance().props.profile).toBe(props.profile);
  });

  it('should receive new props', () => {
    const wrapper = shallow(<ProfilePage {...props} {...state} />);
    const componentWillReceivePropSpy = jest.spyOn(wrapper.instance(), 'componentWillReceiveProps');

    wrapper.setProps({ ...props, profile: { isFetching: true } });
    expect(componentWillReceivePropSpy).toHaveBeenCalled();

    wrapper.instance().componentWillReceiveProps({ ...props, profile: { isFetching: false } });
    expect(wrapper.instance().state.profile).toEqual({ isFetching: false });
  });

  it('should get favorites on mount', () => {
    const wrapper = shallow(<ProfilePage {...props} />);
    const componentDidMountSpy = jest.spyOn(wrapper.instance(), 'componentDidMount');
    wrapper.setProps({ ...props, profile: { payload: {} } });
    wrapper.instance().componentDidMount();
    expect(componentDidMountSpy).toHaveBeenCalled();
    expect(wrapper.instance().props.handleGetUserProfile).toHaveBeenCalled();
  });
});
