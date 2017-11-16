import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import SignUpForm from '../components/signup/SignUpForm';
import NavigationBar from '../components/navigation/NavigationBar';
import handleSignUpRequest from '../actions/requestHandlers/handleSignUprequest';


const propTypes = {
  handleSignUpRequest: PropTypes.func.isRequired
};

class SignUpPage extends Component {
  render() {
    return (
      <div>
        <NavigationBar />
        <SignUpForm handleSignUpRequest={this.props.handleSignUpRequest} />
      </div>
    );
  }
}
SignUpPage.propTypes = propTypes;

export default connect(null, { handleSignUpRequest })(SignUpPage);
