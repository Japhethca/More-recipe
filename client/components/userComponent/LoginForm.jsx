import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Redirect, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { addFlashMessage } from '../../actions/flashMessage';
import { signinValidator } from '../../utils/validators';
import '../../styles/sass/login_form.scss';

class LoginForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      errors: '',
      redirect: false,
      hasErrored: false
    };

    this.onSubmit = this.onSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
    this.isValid = this.isValid.bind(this);
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  isValid() {
    const { errors, isValid } = signinValidator(this.state);
    if (!isValid) {
      this.setState({ errors });
    }
    return isValid;
  }

  onSubmit(e) {
    e.preventDefault();
    if (this.isValid()) {
      this.setState({ inputIsValid: true });
      this.props.handleLoginRequest(this.state).then(
        (res) => {
          this.setState({ redirect: true});
          location.reload();
        },
        (err) => {
          console.log(err.data);
          this.setState({ hasErrored: true });
        }
      );
    }
  }

  render() {
    const { 
      errors, email, password, hasErrored 
    } = this.state;
    if (this.state.redirect) {
      return <Redirect to="/" />;
    }
    return (

      <div className="row login-form">
        <div className="card-panel col s12 m6 offset-m3 l4 offset-l4 z-depth-4">
        <div className="input-field s12 center login-text">
          <h4>LOGIN FORM</h4>
          {hasErrored && <span className="red-text align-center" > Invalid Credentials</span> }
        </div>
        <form className="" onSubmit={this.onSubmit}>
          <div className="row" >
            <div className="input-field col s12 m12">
              <i className="material-icons prefix">person</i>
              <input
                  type="text"
                  onChange ={this.onChange}
                  name="email"
                  placeholder="Email Address"
                />
              <label htmlFor="email" className="active" > Email</label>
              {errors.email && <span className="error-text"> {errors.email[0]}</span>}
            </div>
          </div>
          <div className="row">
            <div className="input-field col s12 m12" >
              <i className="material-icons prefix">lock</i>
              <input
                  type="password"
                  onChange ={this.onChange}
                  name="password"
                  placeholder="Enter Your Password"
                />
              <label htmlFor="password" className="active" > Password</label>
              {errors.password && <span className="error-text">{errors.password[0]}</span>}
            </div>
          </div>

          <div className="row">
            <div className="input-field col s12">
                <button className="btn-large brown waves-effect waves-light col s12 m6 offset-m3 center" type="submit">Login
                </button>
              </div>
          </div>
          <div className="sign-up-link">
            <span>Don't have login? <Link to="/signup">Sign Up Here</Link></span>
          </div>
        </form>
      </div>
      </div>
    );
  }
}

LoginForm.propTypes = {
  handleLoginRequest: PropTypes.func.isRequired,
  addFlashMessage: PropTypes.func.isRequired
};

export default connect(null, { addFlashMessage })(LoginForm);
