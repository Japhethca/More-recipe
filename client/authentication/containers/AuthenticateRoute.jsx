import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import { isValidToken } from '../helpers/setAuthorization';
import { setCurrentUser } from '../actions';

const propTypes = {
  isAuthenticated: PropTypes.bool.isRequired,
  history: PropTypes.objectOf(PropTypes.any).isRequired,
  setCurrentUser: PropTypes.func.isRequired
};


/**
 * @export
 * @param {ReactCoomponent} WrappedComponent
 * @returns {ReactComponent} React
 */
export default function AuthenticateRoute(WrappedComponent) {
  /**
   * @description react route component to authenticate
   * @class Authenticate
   * @extends {Component}
   */
  class Authenticate extends Component {
    /**
     * Creates an instance of Authenticate.
     * @param {any} props
     * @memberof Authenticate
     */
    constructor(props) {
      super(props);
      this.state = {
        isAuthenticated: this.props.isAuthenticated
      };
    }

    /**
     *
     * @description change authorization if token is invalid
     * @memberof Authenticate
     * @returns {undefined}
     */
    componentDidMount() {
      if (localStorage.token) {
        if (!isValidToken(localStorage.token)) {
          this.props.setCurrentUser({});
        }
      }
    }

    /**
     *
     * @description checks if authentication has changed
     * @param {any} nextProps
     * @memberof Authenticate
     * @returns {undefined}
     */
    componentWillReceiveProps(nextProps) {
      if (this.props.isAuthenticated !== nextProps.isAuthenticated) {
        this.setState({ isAuthenticated: nextProps.isAuthenticated });
      }
    }


    /**
     * @description renders authenticated components
     * @returns {ReactElement} markup
     * @memberof Authenticate
     */
    render() {
      return (
        <div>
          {
            this.state.isAuthenticated ?
              <WrappedComponent {...this.props} />
          :
              <Redirect to="/" />
          }
        </div>
      );
    }
  }

  Authenticate.propTypes = propTypes;

  const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated
  });

  return connect(mapStateToProps, { setCurrentUser })(Authenticate);
}
