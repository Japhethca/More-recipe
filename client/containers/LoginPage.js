import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux'; 
import NavigationBar from '../components/NavigationBar';
import Footer from '../components/Footer';
import LoginForm from '../components/userComponent/LoginForm';
import {handleLoginRequest} from '../actions/requestHandlers/handleLoginrequest';


class LoginPage extends Component {
  render() {
    return (
      <div id='main'>
        <NavigationBar />
        <LoginForm handleLoginRequest={this.props.handleLoginRequest} />
        <Footer/>
      </div>
    )
  }
}

LoginPage.propTypes = {
  handleLoginRequest: PropTypes.func.isRequired
};

export default connect(null, {handleLoginRequest})(LoginPage);