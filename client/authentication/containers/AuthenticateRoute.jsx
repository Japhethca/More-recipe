import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

const propTypes = {
  isAuthenticated: PropTypes.bool.isRequired,
  history: PropTypes.objectOf(PropTypes.any).isRequired
};

export default (WrappedComponent) => {
  /**
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
        this.props.history.push('/landing');
      }
    }
    /**
 *
 * react component life cylce function
 * @memberof Authenticate
 * @returns {undefined}
 */
    componentWillUpdate() {
      if (!this.props.isAuthenticated) {
        this.props.history.push('/landing');
      }
    }
    /**
     *
     *
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
};
