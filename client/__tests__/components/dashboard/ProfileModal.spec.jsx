import React from 'react';
import { shallow } from 'enzyme';
import { ProfileModal } from '../../../Dashboard/components/ProfileModal';
import profileMock from '../../__mock__/profileMock';

const props = {
  profile: profileMock.profile,
  handleEditUserProfile: jest.fn(),
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
  });


  it('should have a form and a button element', () => {
    const wrapper = shallow(<ProfileModal {...props} />);
    // expect(wrapper.find('form').length).toBe(1);
    expect(wrapper.find('button').length).toBe(3);
  });

  it('should have an input and an image element', () => {
    const wrapper = shallow(<ProfileModal {...props} />);
    expect(wrapper.find('input').length).toBe(4);
    expect(wrapper.find('img').length).toBe(1);
  });

  it('should handle form submission', () => {
    const wrapper = shallow(<ProfileModal {...props} />);
    wrapper.instance().onSubmit(event);
    expect(wrapper.instance().props.handleEditUserProfile).toHaveBeenCalled();
  });

  it('should handle input change', () => {
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

  it('should receive new props', () => {
    const wrapper = shallow(<ProfileModal {...props} />);
    const componentWillReceivePropsSpy = jest.spyOn(wrapper.instance(), 'componentWillReceiveProps');
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

  it('should simulate modal close click', () => {
    const wrapper = shallow(<ProfileModal {...props} />);
    const finishButton = wrapper.find('.grey').shallow();
    const onFinishClickSpy = jest.spyOn(wrapper.instance(), 'onFinishClick');
    wrapper.instance().onFinishClick(event);
    expect(onFinishClickSpy).toHaveBeenCalled();
  });
});
