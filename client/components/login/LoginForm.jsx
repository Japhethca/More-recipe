import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Redirect, Link } from 'react-router-dom';
import { signinValidator } from '../../utils/validators';
import './login_form.scss';


const propTypes = {
  handleLoginRequest: PropTypes.func.isRequired,
  auth: PropTypes.objectOf(PropTypes.any).isRequired
};


class LoginForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      serverErrors: this.props.auth.errors,
      validationErrors: '',
    };

    this.onSubmit = this.onSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
    this.isValid = this.isValid.bind(this);
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.auth.errors !== null) {
      this.setState({ serverErrors: nextProps.auth.errors });
    }
  }
  onChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  onSubmit(event) {
    event.preventDefault();
    if (this.isValid()) {
      this.props.handleLoginRequest(this.state);
    }
  }

  isValid() {
    const { errors, isValid } = signinValidator(this.state);
    if (!isValid) {
      this.setState({ validationErrors: errors });
    }
    return isValid;
  }

  render() {
    const { validationErrors } = this.state;

    if (this.props.auth.isAuthenticated) {
      window.location.reload();
      return <Redirect to="/" />;
    }
    return (
      <div className="row login-form">
        <div className="card-panel col s12 m6 offset-m3 l4 offset-l4 z-depth-4">
          <div className="auth-text">
            <h4>Log In</h4>
          </div>
          <div className="input-field s12 center">
            {this.state.serverErrors && <span className="red-text align-center" > {this.state.serverErrors} </span> }
          </div>

          <form className="" onSubmit={this.onSubmit}>
            <div className="row" >
              <div className="input-field col s12 m12">
                <i className="material-icons prefix">person</i>
                <input
                  type="text"
                  onChange={this.onChange}
                  name="email"
                  placeholder="Email Address"
                />
                <label htmlFor="email" className="active" > Email</label>
                {validationErrors.email && <span className="error-text"> { validationErrors.email[0] }</span>}
              </div>
            </div>

            <div className="row">
              <div className="input-field col s12 m12" >
                <i className="material-icons prefix">lock</i>
                <input
                  type="password"
                  onChange={this.onChange}
                  name="password"
                  placeholder="Enter Your Password"
                  className="validate"
                />
                <label htmlFor="password" className="active "> Password</label>
                {validationErrors.password && <span className="error-text"> { validationErrors.password[0]}</span>}
              </div>
            </div>

            <div className="row">
              <div className="input-field col s12">
                <button className="btn-large sign-up-btn" type="submit">Login
                </button>
              </div>
            </div>
            <div className="sign-up-link">
              <span> Have an Account? <Link to="/signup" href=" "> Sign Up Here </Link></span>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

LoginForm.propTypes = propTypes;

export default LoginForm;
