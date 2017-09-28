import React, { Component } from 'react'
import PropTypes from 'prop-types';
import {Redirect} from 'react-router-dom';
import classname from 'classnames';
import TextField from '../TextField';
import { signinValidator } from '../../utils/validators';

class LoginForm extends Component {
  constructor(props) {
    super(props)
    this.state = {
      email: '',
      password: '',
      errors: '',
      redirect: false
    };

    this.onSubmit = this.onSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
    this.isValid = this.isValid.bind(this);
  }
  
  onChange(e){
    this.setState({[e.target.name]: e.target.value})
  }

  isValid(){
    const {errors, isValid} = signinValidator(this.state);
    if (!isValid){
      this.setState({errors})
    }
    return isValid;
  }

  onSubmit(e){
    e.preventDefault();
    if (this.isValid()){
      this.setState({inputIsValid: true})
      this.props.handleLoginRequest(this.state).then(
        (res) => {this.setState({redirect: true})},
        (err) => this.setState({errors: err})
        );
    }
  }

  render() {
    const {errors, email, password} = this.state;
    if (this.state.redirect){
      return <Redirect to='/' />
    }
    return (
      <div className='row'>
      <div className='card-panel col s12 m10 offset-m1 l6 offset-l3 z-depth-4'>
        <h4>Login Form</h4>
        <form className='' onSubmit={this.onSubmit}>
          <div className={classname('input-field','row',{'red-text':errors.email})} >
                <input 
                  className='col s12 m12'
                  type='text'
                  onChange = {this.onChange}
                  name='email'
                  />
                <label htmlFor='email' > Email</label>
                {errors.email && <span> {errors.email[0]}</span>}
            </div>
            <div className={classname('input-field','row',{'red-text':errors.password})} >
              <input 
                className='col s12 m12'
                type='password'
                onChange = {this.onChange}
                name='password'
                />
              <label htmlFor='password' > Password</label>
              {errors.password && <span>{errors.password[0]}</span>}
          </div>
          <div className="row">
              <div className="input-field col s12">
                <button className="btn brown waves-effect waves-light col m4 right" type="submit">Login
                </button>
            </div>
          </div>
        </form>
      </div>
      </div>
    )
  }
}

LoginForm.propTypes = {
  handleLoginRequest: PropTypes.func.isRequired
}

export default LoginForm;