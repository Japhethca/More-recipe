import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import TextField from '../common/TextField';
import { signUpValidator } from '../../utils/validators';
import './signup_form.scss';


const propTypes = {
  handleSignUpRequest: PropTypes.func.isRequired,
  history: PropTypes.objectOf(PropTypes.any).isRequired,
  auth: PropTypes.objectOf(PropTypes.any).isRequired,
};

class SignUpForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      email: '',
      password: '',
      verifyPassword: '',
      serverErrors: '',
      validationErrors: '',
    };
  }
  onChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  }


  onSubmit = (event) => {
    event.preventDefault();
    if (this.isValid()) {
      this.props.handleSignUpRequest(this.state);
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
    const { validationErrors } = this.state;

    if (this.props.auth.isAuthenticated) {
      this.props.history.push('/');
    }
    return (
      <div className="row signup-form">
        <div className="card-panel col s12 m4 offset-m4 z-depth-4">
          <div className="auth-text">
            <h4>Sign Up</h4>
          </div>
          <div className="input-field s12 center">
            {this.state.serverErrors && <span className="red-text">{this.state.serverErrors}</span>}
          </div>
          <form className="" onSubmit={this.onSubmit}>
            <div className="input-field col s12">
              <TextField
                iconClassName="material-icons prefix"
                iconName="person_outline"
                value={this.state.username}
                onChange={this.onChange}
                name="username"
                label="Username"
                errorClass="errorclass"
                errorText={validationErrors.username}
              />
            </div>
            <div className="input-field col s12">
              <TextField
                iconClassName="material-icons prefix"
                iconName="mail"
                value={this.state.email}
                onChange={this.onChange}
                name="email"
                label="Email"
                errorClass="errorclass"
                errorText={validationErrors.email}
              />
            </div>
            <div className="input-field col s12">
              <TextField
                iconClassName="material-icons prefix"
                iconName="lock"
                value={this.state.password}
                onChange={this.onChange}
                name="password"
                type="password"
                label="Password"
                errorClass="errorclass"
                errorText={validationErrors.password}
              />
            </div>
            <div className="input-field col s12">
              <TextField
                iconClassName="material-icons prefix"
                iconName="lock"
                value={this.state.verifyPassword}
                onChange={this.onChange}
                name="verifyPassword"
                label="Confirm Password"
                errorClass="errorclass"
                type="password"
                errorText={validationErrors.verifyPassword}
              />
            </div>
            <div className="input-field col s12">
              <button className="btn-large sign-up-btn" type="submit">
                Register
              </button>
            </div>

            <div className="login-link right">
              <span>Have login details? <Link to="/signin" href >Login Here</Link></span>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

SignUpForm.propTypes = propTypes;

export default SignUpForm;
