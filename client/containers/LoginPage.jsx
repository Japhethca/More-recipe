import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import NavigationBar from '../components/NavigationBar';
import Footer from '../components/Footer';
import LoginForm from '../components/userComponent/LoginForm';
import { handleLoginRequest } from '../actions/requestHandlers/handleLoginrequest';
import '../styles/sass/index.scss';

class LoginPage extends Component {
  componentDidMount() {
    document.title = 'Signin / Signin Form';
  }
  render() {
    return (
      <div>
        <NavigationBar />
        <div id="main">
          <LoginForm handleLoginRequest={this.props.handleLoginRequest} />
        </div>
        <Footer />
      </div>
    );
  }
}

LoginPage.propTypes = {
  handleLoginRequest: PropTypes.func.isRequired
};

export default connect(null, { handleLoginRequest })(LoginPage);
