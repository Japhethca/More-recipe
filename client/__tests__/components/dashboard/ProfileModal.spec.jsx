import React from 'react';
import { shallow } from 'enzyme';
import { ProfileModal } from '../../../Dashboard/components/ProfileModal';
import profileMock from '../../__mock__/profileMock';

const props = {
  profile: profileMock.profile,
  handleUpdateUserProfile: jest.fn(),
  isFetching: false,
};

const event = {
  preventDefault: jest.fn(event => event),
  target: {
    name: 'firstname',
    value: 'chidex'
  }
};

const state = {
  photo: 'http://image.com/image.jpeg',
  firstname: 'andela',
  lastname: 'epic',
  aboutme: 'andela is epic'
};

describe('<ProfileModal />', () => {
  it('renders without exploding', () => {
    const wrapper = shallow(<ProfileModal {...props} />);
    expect(wrapper).toBeDefined();
    expect(wrapper.length).toBe(1);
    expect(wrapper.find('div').length).toBe(9);
    expect(wrapper.find('button').length).toBe(3);
    expect(wrapper.find('input').length).toBe(4);
    expect(wrapper.find('img').length).toBe(1);
  });

  it('should render new image on change', () => {
    const wrapper = shallow(<ProfileModal {...props} {...state} />);
    wrapper.instance().onChange(event);
    expect(wrapper.instance().state.firstname).toBe('chidex');
    const newEvent = {
      target: {
        name: 'photo',
        files: [new Blob()]
      }
    };
    wrapper.instance().onChange(newEvent);
    expect(wrapper.instance().state.photo).toEqual(new Blob());
  });

  it('should receive new props when profile is updated', () => {
    const wrapper = shallow(<ProfileModal {...props} />);
    const componentWillReceivePropsSpy = jest
      .spyOn(wrapper.instance(), 'componentWillReceiveProps');
    wrapper.setProps({
      profile: {
        photo: 'http://image.com/image.jpeg',
        firstname: 'chidex',
        lastname: 'epic',
        aboutme: 'andela is epic'
      }
    });
    expect(componentWillReceivePropsSpy).toHaveBeenCalled();
    expect(wrapper.instance().state.firstname).toBe('chidex');
  });

  it('should simulate profile modal click form submission click', () => {
    const wrapper = shallow(<ProfileModal {...props} />);
    const updateButton = wrapper.find('.btn .blue');
    const handleUpdateUserProfileSpy = jest.spyOn(wrapper.instance().props, 'handleUpdateUserProfile');
    updateButton.simulate('click', event)
    expect(handleUpdateUserProfileSpy).toHaveBeenCalled();
  });

  it('should simulate profile form submission click', () => {
    const wrapper = shallow(<ProfileModal {...props} />);
    const finishButton = wrapper.find('.grey');
    const onFinishClickSpy = jest.spyOn(wrapper.instance(), 'onFinishClick');
    wrapper.instance().onFinishClick(event);
    expect(onFinishClickSpy).toHaveBeenCalled();
  });
});
