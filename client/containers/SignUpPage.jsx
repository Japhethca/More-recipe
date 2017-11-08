import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import SignUpForm from '../components/userComponent/SignUpForm';
import NavigationBar from '../components/NavigationBar';
import Footer from '../components/Footer';
import handleSignUpRequest from '../actions/requestHandlers/handleSignUprequest';

class SignUpPage extends Component {
  render() {
    return (
      <div>
        <NavigationBar />
        <SignUpForm handleSignUpRequest={this.props.handleSignUpRequest} />
        <Footer />
      </div>
    );
  }
}
SignUpPage.propTypes = {
  handleSignUpRequest: PropTypes.func.isRequired
};

export default connect(null, { handleSignUpRequest })(SignUpPage);