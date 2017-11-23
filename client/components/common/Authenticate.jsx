import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

const propTypes = {
  isAuthenticated: PropTypes.bool.isRequired,
  history: PropTypes.objectOf(PropTypes.any).isRequired
};

export default function (Comp) {
  class Authenticate extends Component {
    componentWillMount() {
      if (!this.props.isAuthenticated) {
        this.props.history.push('/landing');
      }
    }
    componentWillUpdate() {
      if (!this.props.isAuthenticated) {
        this.props.history.push('/landing');
      }
    }
    render() {
      return <Comp {...this.props} />;
    }
  }

  Authenticate.propTypes = propTypes;

  const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated
  });

  return connect(mapStateToProps, { })(Authenticate);
}
