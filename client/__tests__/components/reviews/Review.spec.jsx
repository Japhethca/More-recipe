import React from 'react';
import expect from 'expect';
import { shallow } from 'enzyme';
import Review from '../../../Reviews/components/Review';
import mockData from '../../__mock__/mockData';


const props = {
  review: mockData.Review
};

describe('<Review /> ', () => {
  it('should mount without exploding', () => {
    const wrapper = shallow(<Review {...props} />);
    expect(wrapper).toBeDefined();
    expect(wrapper.find('p').length).toBe(1);
    expect(wrapper.find('.review-content').length).toBe(1);
    expect(wrapper.hasClass('single-review')).toBe(true);
  });

  it('should render with new review', () => {
    const newProps = {
      review: {
        content: 'this is an awesome recipe',
        createdAt: new Date(),
        User: {
          username: 'chidex'
        }
      }
    }
    const wrapper = shallow(<Review {...newProps} />);
    expect(wrapper.find('.review-content')
      .text()).toBe('this is an awesome recipe');
  });

  it('should match snapshot', () => {
    const wrapper = shallow(<Review {...props} />);
    expect(toJson(wrapper)).toMatchSnapshot();
  });
});

