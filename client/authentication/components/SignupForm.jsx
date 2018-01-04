import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import TextField from '../../common/TextField';
import '../syles/authentication.scss';


const SignupForm = (props) => {
  const {
    serverErrors, onChange, onSubmit, validationErrors, formData
  } = props;
  return (
    <div className="row auth-form">
      <div className="card col s12 m4 offset-m4 z-depth-4">
        <div className="header-text">
          <h4>Sign Up</h4>
        </div>
        {serverErrors && <span className="red-text center">{serverErrors}</span>}
        <form className="" onSubmit={onSubmit}>
          <div className="input-field col s12">
            <TextField
              iconClassName="material-icons prefix"
              iconName="person_outline"
              value={formData.username}
              onChange={onChange}
              name="username"
              label="Username"
              errorClass="error-class"
              errorText={validationErrors.username}
            />
          </div>
          <div className="input-field col s12">
            <TextField
              iconClassName="material-icons prefix"
              iconName="mail"
              value={formData.email}
              onChange={onChange}
              name="email"
              label="Email"
              errorClass="error-class"
              errorText={validationErrors.email}
            />
          </div>
          <div className="input-field col s12">
            <TextField
              iconClassName="material-icons prefix"
              iconName="lock"
              value={formData.password}
              onChange={onChange}
              name="password"
              type="password"
              label="Password"
              errorClass="error-class"
              errorText={validationErrors.password}
            />
          </div>
          <div className="input-field col s12">
            <TextField
              iconClassName="material-icons prefix"
              iconName="lock"
              value={formData.verifyPassword}
              onChange={onChange}
              name="verifyPassword"
              label="Confirm Password"
              errorClass="error-class"
              type="password"
              errorText={validationErrors.verifyPassword}
            />
          </div>
          <div className="input-field col s12">
            <button className="btn-large auth-btn" type="submit">
                Register
            </button>
          </div>
          <div className="auth-link right">
            <span>Have login details? <Link to="/signin" href >Login Here</Link></span>
          </div>
        </form>
      </div>
    </div>
  );
};

SignupForm.propTypes = {
  onChange: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  serverErrors: PropTypes.arrayOf(PropTypes.any).isRequired,
  validationErrors: PropTypes.objectOf(PropTypes.any).isRequired,
  formData: PropTypes.objectOf(PropTypes.any).isRequired
};

export default SignupForm;
