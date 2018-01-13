import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import TextField from '../../common/TextField';
import '../syles/authentication.scss';


/**
 * @description displays downvote button
 * @param {object} props - React props
 * @returns {ReactElement} markup
 */
const LoginForm = (props) => {
  const {
    validationErrors, serverErrors, onChange, onSubmit, formData
  } = props;
  return (
    <div className="row auth-form container">
      <div className="card col s12 m6 offset-m4 l4 offset-l4 z-depth-4">
        <div className="header-text">
          <h4>Log In</h4>
        </div>
        <div className="server-error-text">
          {serverErrors && <span > {serverErrors} </span> }
        </div>
        <form className="" onSubmit={onSubmit}>
          <div className="input-field col s12 m12">
            <TextField
              iconClassName="material-icons prefix"
              iconName="person"
              value={formData.email}
              onChange={onChange}
              name="email"
              labelClassName="active"
              label="Email"
              errorClass="error-class"
              errorText={validationErrors.email}
            />
          </div>
          <div className="input-field col s12 m12">
            <TextField
              iconClassName="material-icons prefix"
              iconName="lock"
              value={formData.password}
              onChange={onChange}
              name="password"
              type="password"
              labelClassName="active"
              label="Password"
              errorClass="error-class"
              errorText={validationErrors.password}
            />
          </div>
          <div className="input-field col s12">
            <button
              className="btn-large auth-btn"
              type="submit"
              disabled={props.isFetching}
            >
              {props.isFetching ? 'Loging In...' : 'Login' }
            </button>
          </div>
          <div className="auth-link">
            <span> Don&#39;t have an Account? <Link to="/signup" href="/signup"> Sign Up Here </Link></span>
          </div>
        </form>
      </div>
    </div>
  );
};


LoginForm.propTypes = {
  onChange: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  serverErrors: PropTypes.string.isRequired,
  validationErrors: PropTypes.objectOf(PropTypes.any).isRequired,
  formData: PropTypes.objectOf(PropTypes.any).isRequired,
  isFetching: PropTypes.bool.isRequired
};


export default LoginForm;
