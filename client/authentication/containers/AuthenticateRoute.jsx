import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

const propTypes = {
  isAuthenticated: PropTypes.bool.isRequired,
  history: PropTypes.objectOf(PropTypes.any).isRequired
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
     * @description react component life cyle function
     * @returns {undefined}
     */
    componentWillMount() {
      if (!this.props.isAuthenticated) {
        this.props.history.push('/');
      }
    }

    /**
     *
     * @description checks if a user is authenticated when the page is refreshed
     * @memberof Authenticate
     * @returns {undefined}
     */
    componentWillUpdate() {
      if (!this.props.isAuthenticated) {
        this.props.history.push('/');
      }
    }

    /**
     * @description renders authenticated components
     * @returns {ReactElement} markup
     * @memberof Authenticate
     */
    render() {
      return <WrappedComponent {...this.props} />;
    }
  }

  Authenticate.propTypes = propTypes;

  const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated
  });

  return connect(mapStateToProps, { })(Authenticate);
}
