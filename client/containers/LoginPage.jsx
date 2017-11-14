import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import NavigationBar from '../components/navigation/NavigationBar';
import Footer from '../components/navigation/Footer';
import LoginForm from '../components/login/LoginForm';
import { handleLoginRequest } from '../actions/requestHandlers/handleLoginrequest';
import '../styles/sass/index.scss';


const propTypes = {
  handleLoginRequest: PropTypes.func.isRequired
};
class LoginPage extends Component {
  componentDidMount() {
    document.title = 'Signin / Signin Form';
  }
  render() {
    return (
      <div>
        <NavigationBar />
        <div id="main">
          <LoginForm
            handleLoginRequest={this.props.handleLoginRequest}
          />
        </div>
        <Footer />
      </div>
    );
  }
}

LoginPage.propTypes = propTypes;

export default connect(null, { handleLoginRequest })(LoginPage);
