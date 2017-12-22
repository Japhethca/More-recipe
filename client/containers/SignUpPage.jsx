import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import SignUpForm from '../components/signup/SignUpForm';
import handleSignUpRequest from '../actions/requestHandlers/handleSignUprequest';


const propTypes = {
  auth: PropTypes.objectOf(PropTypes.any).isRequired,
  handleSignUpRequest: PropTypes.func.isRequired,
  history: PropTypes.objectOf(PropTypes.any).isRequired
};

const SignUpPage = props => (
  <div>
    <SignUpForm
      handleSignUpRequest={props.handleSignUpRequest}
      history={props.history}
      auth={props.auth}
    />
  </div>
);

SignUpPage.propTypes = propTypes;

const mapStateToProps = state => ({
  auth: state.auth
});
export default connect(mapStateToProps, { handleSignUpRequest })(SignUpPage);
