import React, { Component } from 'react'
import PropTypes from 'prop-types';
import {Redirect} from 'react-router';
import { signUpValidator } from '../../utils/validators';

class SignUpForm extends Component {
  constructor(props) {
    super(props)
    this.state = {
      firstname: '',
      lastname: '',
      username: '',
      email: '',
      password: '',
      verifyPassword: '',
      errors: '',
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }
  onChange(e){
    this.setState({[e.target.name] : e.target.value});
  }
  isValid(){
    const {errors, isValid} = signUpValidator(this.state);
    if (!isValid){
      this.setState({errors})
    }
    return isValid;
  }

  onSubmit(e){
    e.preventDefault();
    if (this.isValid()){
      this.props.handleSignUpRequest(this.state).then(
        (res) => {},
        (err) => this.setState({errors: err})
        );
    }
  }

  render() {
    const {errors} = this.state;
    const {hasSignedUp} = this.state;
    if (hasSignedUp){
      return <Redirect to='/' />
    } 
    return (
      <div className='row'>
      <div className='card-panel col s12 m12 l8 offset-l2 z-depth-4'>
        <h4>User Registration Form</h4>
        <form className='' onSubmit={this.onSubmit}>
            <div className='row'>
                <div className='input-field col s12 m6'>
                  <input 
                    type='text'
                    onChange = {this.onChange}
                    name='firstname'
                    className='input-field'
                  />
                  <label htmlFor='firstname'> Firstname </label>
                  {errors.firstname && <span className='error1'>{errors.firstname[0]}</span>}
                </div>

                <div className='input-field col s12 m6'>
                  <input 
                    type='text'
                    onChange = {this.onChange}
                    name='lastname'
                    className='input-field'
                  />
                  <label htmlFor='lastname'> Lastname </label>
                  {errors.lastname && <span className='error1'>{errors.lastname[0]}</span>}
                </div>
          </div>
          <div className='row' >
            <div className='input-field col s12 m6'>
              <input 
                type='text'
                onChange = {this.onChange}
                name='username'
                className='input-field'
              />
              <label htmlFor='username'> Username </label>
              {errors.username && <span className='error1'>{errors.username[0]}</span>}
            </div>
            <div className='input-field col s12 m6'>
              <input 
                type='email'
                onChange = {this.onChange}
                name='email'
                className='input-field'
              />
              <label htmlFor='email'> Email </label>
              {errors.email && <span className='error1'>{errors.email[0]}</span>}
            </div>
          </div>
          <div className='row'>
            <div className='input-field col s12 m6'>
              <input 
                type='password'
                onChange = {this.onChange}
                name='password'
                className='input-field'
              />
              <label htmlFor='password'> Password </label>
              {errors.password && <span className='error1'>{errors.password[0]}</span>}
            </div>
            <div className='input-field col s12 m6'>
              <input 
                type='password'
                onChange = {this.onChange}
                name='verifyPassword'
                className='input-field'
              />
              <label htmlFor='verifyPassword'> VerifyPassword </label>
              {errors.verifyPassword && <span className='error1'>{errors.verifyPassword[0]}</span>}
            </div>
          </div>
          <div className="row">
              <div className="input-field col s12">
                <button className="btn brown waves-effect waves-light col m4 right" type="submit">Register
                </button>
            </div>
          </div>
        </form>
      </div>
      </div>
    )
  }
}

SignUpForm.propTypes = {
  handleSignUpRequest: PropTypes.func.isRequired
}

export default SignUpForm;