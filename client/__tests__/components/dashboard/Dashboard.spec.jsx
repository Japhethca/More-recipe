import React from 'react';
import { shallow } from 'enzyme';
import { Dashboard } from '../../../Dashboard/containers/Dashboard';
import profileMock from '../../__mock__/profileMock';

const props = {
  handleLogout: jest.fn(),
  history: { push: jest.fn() },
  profile: profileMock.profile
};

describe('<Dashboard />', () => {
  it('should render without exploding', () => {
    const wrapper = shallow(<Dashboard {...props} />);
    expect(wrapper).toBeDefined();
    expect(wrapper.length).toBe(1);
    expect(wrapper.find('div').length).toBe(4);
    expect(wrapper.hasClass('container')).toBe(true);
    expect(wrapper.find('NavLink').length).toBe(4);
    expect(wrapper.find('Route').length).toBe(2);
  });

  describe('Logout Button', () => {
    it(
      'should logout authenticated users when clicked',
      () => {
        const wrapper = shallow(<Dashboard {...props} />);
        wrapper.find('#logout').simulate('click');
        expect(wrapper.instance().props.profile).toBe(props.profile);
        expect(wrapper.instance().props.handleLogout).toHaveBeenCalled();
      }
    );
  });
});
