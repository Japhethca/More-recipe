import React from 'react';
import expect from 'expect';
import { shallow } from 'enzyme';
import ProfileView from '../../../Dashboard/components/ProfileView';
import profileMock from '../../__mock__/profileMock';

const props = {
  profile: { payload: profileMock.profile }
};

describe('<ProfileView />', () => {
  it('should render without exploding', () => {
    const wrapper = shallow(<ProfileView {...props} />);
    expect(wrapper).toBeDefined();
    expect(wrapper.length).toBe(1);
    expect(wrapper.find('div').length).toBe(7);
    expect(wrapper.hasClass('profile-cover')).toBe(true);
    expect(wrapper.find('img').length).toBe(1);
    expect(wrapper.find('a').length).toBe(1);
  });
});
