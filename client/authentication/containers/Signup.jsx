import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';


import { handleAuthRequest } from '../actions';
import { signUpValidator } from '../../utilities/validators';
import SignupForm from '../components/SignupForm';

class Signup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      email: '',
      password: '',
      verifyPassword: '',
      serverErrors: this.props.authentication.errors,
      validationErrors: {},
    };
  }

  onChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
    this.isValid();
  }


  onSubmit = (event) => {
    event.preventDefault();
    if (this.isValid()) {
      this.props.handleAuthRequest(this.state, 'signup');
    }
  }

  isValid = () => {
    const { errors, isValid } = signUpValidator(this.state);
    if (!isValid) {
      this.setState({ validationErrors: errors });
    }
    return isValid;
  }

  render() {
    const formData = {
      email: this.state.email,
      password: this.state.password,
      username: this.state.username,
      verifyPassword: this.state.verifyPassword
    };

    if (this.props.authentication.isAuthenticated) {
      this.props.history.push('/');
    }

    return (
      <div>
        <SignupForm
          onChange={this.onChange}
          onSubmit={this.onSubmit}
          formData={formData}
          serverErrors={this.state.serverErrors}
          validationErrors={this.state.validationErrors}
        />
      </div>
    );
  }
}

Signup.propTypes = {
  handleAuthRequest: PropTypes.func.isRequired,
  history: PropTypes.objectOf(PropTypes.any).isRequired,
  authentication: PropTypes.objectOf(PropTypes.any).isRequired,
};
const mapStateToProps = state => ({
  authentication: state.auth
});


export default connect(mapStateToProps, { handleAuthRequest })(Signup);
