import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Redirect, Link } from 'react-router-dom';
import { signUpValidator } from '../../utils/validators';
import './signup_form.scss';


const propTypes = {
  handleSignUpRequest: PropTypes.func.isRequired,
};

class SignUpForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstname: '',
      lastname: '',
      username: '',
      email: '',
      password: '',
      verifyPassword: '',
      serverErrors: '',
      validationErrors: '',
      hasSignedUp: false,
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }
  onChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }


  onSubmit(event) {
    event.preventDefault();
    if (this.isValid()) {
      this.props.handleSignUpRequest(this.state).then(
        (res) => {
          if (res.data.message) {
            this.setState({ hasSignedUp: true });
          }
        },
        (error) => {
          this.setState({ serverErrors: error.response.data.message });
        }
      );
    }
  }

  isValid() {
    const { errors, isValid } = signUpValidator(this.state);
    if (!isValid) {
      this.setState({ validationErrors: errors });
    }
    return isValid;
  }

  render() {
    const { validationErrors } = this.state;
    const { hasSignedUp } = this.state;
    if (hasSignedUp) {
      return <Redirect to="/signin" />;
    }
    return (
      <div className="row signup-form">
        <div className="card-panel col s12 m4 offset-m4 z-depth-4">
          <div className="input-field s12 center signup-text">
            <h4>Sign Up</h4>
            {this.state.serverErrors && <span className="red-text">{this.state.serverErrors}</span>}
          </div>
          <form className="" onSubmit={this.onSubmit}>
            <div className="input-field col s12">
              <i className="material-icons prefix">account_circle</i>
              <input
                type="text"
                onChange={this.onChange}
                name="firstname"
                className="input-field"
              />
              <label htmlFor="firstname"> Firstname </label>
              {validationErrors.firstname && <span className="errorclass">{validationErrors.firstname[0]}</span>}
            </div>

            <div className="input-field col s12">
              <i className="material-icons prefix">account_circle</i>
              <input
                type="text"
                onChange={this.onChange}
                name="lastname"
                className="input-field"
              />
              <label htmlFor="lastname"> Lastname </label>
              {validationErrors.lastname && <span className="errorclass">{validationErrors.lastname[0]}</span>}
            </div>
            <div className="input-field col s12">
              <i className="material-icons prefix">person_outline</i>
              <input
                type="text"
                onChange={this.onChange}
                name="username"
                className="input-field"
              />
              <label htmlFor="username"> Username </label>
              {validationErrors.username && <span className="errorclass">{validationErrors.username[0]}</span>}
            </div>
            <div className="input-field col s12">
              <i className="material-icons prefix">mail</i>
              <input
                type="email"
                onChange={this.onChange}
                name="email"
                className="input-field"
              />
              <label htmlFor="email"> Email </label>
              {validationErrors.email && <span className="errorclass">{validationErrors.email[0]}</span>}
            </div>

            <div className="input-field col s12">
              <i className="material-icons prefix">lock</i>
              <input
                type="password"
                onChange={this.onChange}
                name="password"
                className="input-field"
              />
              <label htmlFor="password"> Password </label>
              {validationErrors.password && <span className="errorclass">{validationErrors.password[0]}</span>}
            </div>
            <div className="input-field col s12">
              <i className="material-icons prefix">lock</i>
              <input
                type="password"
                onChange={this.onChange}
                name="verifyPassword"
                className="input-field"
              />
              <label htmlFor="verifyPassword"> VerifyPassword </label>
              {validationErrors.verifyPassword && <span className="errorclass">{validationErrors.verifyPassword[0]}</span>}
            </div>


            <div className="input-field col s12">
              <button className="btn-large sign-up-btn" type="submit">
                Register
              </button>
            </div>

            <div className="login-link right">
              <span>Have login details? <Link to="/signin" href >Signin Here</Link></span>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

SignUpForm.propTypes = propTypes;

export default SignUpForm;
