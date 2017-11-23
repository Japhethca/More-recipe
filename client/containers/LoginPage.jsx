import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import LoginForm from '../components/login/LoginForm';
import { handleLoginRequest } from '../actions/requestHandlers/handleLoginrequest';
import '../styles/sass/index.scss';


const propTypes = {
  handleLoginRequest: PropTypes.func.isRequired,
  auth: PropTypes.objectOf(PropTypes.any).isRequired
};
class LoginPage extends Component {
  componentDidMount() {
    document.title = 'Signin / Signin Form';
  }
  render() {
    return (
      <div>
        <div id="main">
          <LoginForm
            handleLoginRequest={this.props.handleLoginRequest}
            auth={this.props.auth}
          />
        </div>
      </div>
    );
  }
}

LoginPage.propTypes = propTypes;
const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps, { handleLoginRequest })(LoginPage);
