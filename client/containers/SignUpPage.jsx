import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import SignUpForm from '../components/signup/SignUpForm';
import handleSignUpRequest from '../actions/requestHandlers/handleSignUprequest';


const propTypes = {
  handleSignUpRequest: PropTypes.func.isRequired
};

class SignUpPage extends Component {
  render() {
    return (
      <div>
        <SignUpForm handleSignUpRequest={this.props.handleSignUpRequest} />
      </div>
    );
  }
}
SignUpPage.propTypes = propTypes;

export default connect(null, { handleSignUpRequest })(SignUpPage);
