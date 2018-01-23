import React from 'react';
import { shallow } from 'enzyme';
import AuthenticateRoute from '../../../authentication/containers/AuthenticateRoute';
import LoginForm from '../../../authentication/components/LoginForm';
import mockstore from '../../__mock__/configMockStore';

const store = mockstore({
  auth: {
    isAuthenticated: true
  }
});
const props = {
  isAuthenticated: false,
  history: {},
  setCurrentUser: jest.fn(),
  store
};

const state = {
  isAuthenticated: false
};

/**
 * @class MockComponent
 */
class MockComponent extends React.Component {
  /**
   * @returns {jsx} react element
   */
  render() {
    return (<div>Component</div>);
  }
}

const WrappedComponent = AuthenticateRoute(MockComponent);

describe('<AuthenticateRoute />', () => {
  it('should render without exploding', () => {
    const wrapper = shallow(<WrappedComponent {...props} />);
    expect(wrapper).toBeDefined();
    expect(wrapper.length).toBe(1);
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it(
    'should handle routes authentication when a user navigates to a new page',
    () => {
      const wrapper = shallow(<WrappedComponent {...props} {...state} />);
      const componentWillReceivePropsSpy = jest
        .spyOn(wrapper.instance(), 'componentWillReceiveProps');
      wrapper.setProps({ ...props, isAuthenticated: true });
      expect(componentWillReceivePropsSpy).toHaveBeenCalled();
      expect(toJson(wrapper)).toMatchSnapshot();
    }
  );
});
