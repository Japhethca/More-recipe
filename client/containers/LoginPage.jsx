import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import LoginForm from '../components/login/LoginForm';
import { handleLoginRequest } from '../actions/requestHandlers/handleLoginrequest';
import '../styles/sass/index.scss';


const propTypes = {
  handleLoginRequest: PropTypes.func.isRequired,
  auth: PropTypes.objectOf(PropTypes.any).isRequired,
  history: PropTypes.objectOf(PropTypes.any).isRequired
};

const LoginPage = props => (
  <LoginForm
    handleLoginRequest={props.handleLoginRequest}
    history={props.history}
    auth={props.auth}
  />
);

LoginPage.propTypes = propTypes;

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps, { handleLoginRequest })(LoginPage);
