import React, { Component } from 'react'
import PropTypes from 'prop-types';
import {Redirect, Link} from 'react-router-dom';
import {connect } from 'react-redux';
import { signUpValidator } from '../../utils/validators';
import {addFlashMessage} from '../../actions/flashMessage';
import '../../styles/sass/signup_form.scss';

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
      hasSignedUp: false
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
        (res) => {
          this.props.addFlashMessage({
            type: 'Success',
            text: "Registration Successful"
          });
          this.setState({hasSignedUp: true})
        },
        (err) => this.setState({errors: err})
        );
    }
  }

  render() {
    const {errors} = this.state;
    const {hasSignedUp} = this.state;
    if (hasSignedUp){
      return <Redirect to='/signin' />
    } 
    return (
      <div className='row signup-form'>
      <div className='card-panel col s12 m12 l8 offset-l2 z-depth-4'>
        <div className='input-field s12 center signup-text'>
          <h4>USER REGISTRATION</h4>
        </div>
        <form className='' onSubmit={this.onSubmit}>
            <div className='row'>
                <div className='input-field col s12 m6'>
                  <i className='material-icons prefix'>account_circle</i>
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
                  <i className='material-icons prefix'>account_circle</i>
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
              <i className='material-icons prefix'>person_outline</i>
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
              <i className='material-icons prefix'>mail</i>
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
              <i className='material-icons prefix'>lock</i>
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
              <i className='material-icons prefix'>lock</i>
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
            <div className="input-field col s12 m6 center">
                <button className="btn-large brown waves-effect waves-light col s12 m4" type="submit">Register
                </button>
            </div>
            
            <div className='login-link right'>
              <span>Have login details? <Link to='/signin'>Signin Here</Link></span>
            </div>
          </div>
          
        </form>
      </div>
      </div>
    )
  }
}

SignUpForm.propTypes = {
  handleSignUpRequest: PropTypes.func.isRequired,
  addFlashMessage: PropTypes.func.isRequired,
}

export default connect(null, {addFlashMessage})(SignUpForm);