import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux'; 
import NavigationBar from '../components/NavigationBar';
import LoginForm from '../components/LoginForm';
import {handleLoginRequest} from '../actions/requestHandlers/handleLoginrequest';


class LoginPage extends Component {
  render() {
    return (
      <div>
        <NavigationBar />
        <LoginForm handleLoginRequest={this.props.handleLoginRequest} />>
      </div>
    )
  }
}

LoginPage.propTypes = {
  handleLoginRequest: PropTypes.func.isRequired
};

export default connect(null, {handleLoginRequest})(LoginPage);