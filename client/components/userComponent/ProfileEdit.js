import React, { Component } from 'react';
import PropTypes from 'prop-types';
;

class ProfileEdit extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstname: this.props.profile.firstname,
      lastname: this.props.profile.lastname,
      username: this.props.profile.username,
      aboutme: this.props.profile.aboutme,
      password: this.props.profile.password,
      newPassword: '',
      photo: '',
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }
  onChange(e){
    this.setState({[e.target.name]: e.target.value});
    if (e.target.files[0]){
      this.setState({photo: e.target.files[0]})
    }
   
  }
  onSubmit(e){
    e.preventDefault();
    console.log(this.state, 'The state');
    this.props.handleEditUserProfile(this.state);
    this.props.changeMode(false);
  }
  render() {
    const {errors, username, password, verifyPassword, firstname, lastname, aboutme} = this.state;
    return ( 
      <div>
        <div className='row signup-form'>
        <div className='card-panel col s12 m12 l8 offset-l2 z-depth-4'>
          <div className='input-field s12 center signup-text'>
            <h4>EDIT YOUR PROFILE</h4>
          </div>
          <form className='' onSubmit={this.onSubmit} enctype="multipart/form-data">
              <div className='row'>
                  <div className='input-field col s12 m6'>
                    <i className='material-icons prefix'>account_circle</i>
                    <input 
                      type='text'
                      onChange = {this.onChange}
                      name='firstname'
                      value={firstname}
                      className='input-field'
                    />
                    <label htmlFor='firstname' className='active' > Firstname </label>
                    {/* {errors.firstname && <span className='error1'>{errors.firstname[0]}</span>} */}
                  </div>

                  <div className='input-field col s12 m6'>
                    <i className='material-icons prefix'>account_circle</i>
                    <input 
                      type='text'
                      onChange = {this.onChange}
                      name='lastname'
                      value={lastname}
                      className='input-field'
                    />
                    <label htmlFor='lastname' className='active'> Lastname </label>
                    {/* {errors.lastname && <span className='error1'>{errors.lastname[0]}</span>} */}
                  </div>
            </div>
            <div className='row' >
              <div className='input-field col s12 m6'>
                <i className='material-icons prefix'>person_outline</i>
                <input 
                  type='text'
                  onChange = {this.onChange}
                  name='username'
                  value={username}
                  className='input-field'
                />
                <label htmlFor='username' className='active' > Username </label>
                {/* {errors.username && <span className='error1'>{errors.username[0]}</span>} */}
              </div>
              <div className='input-field col s12 m6'>
                <i className='material-icons prefix'>mail</i>
                <textarea 
                  type='text'
                  onChange = {this.onChange}
                  name='aboutme'
                  value={aboutme}
                  className='input-field'
                />
                <label htmlFor='aboutme' className='active' > About Me </label>
                {/* {errors.email && <span className='error1'>{errors.email[0]}</span>} */}
              </div>
            </div>
            <div className='row'>
              <div className='input-field col s12 m6'>
                <i className='material-icons prefix'>lock</i>
                <input 
                  type='password'
                  onChange = {this.onChange}
                  name='password'
                  value={password}
                  className='input-field'
                />
                <label htmlFor='password' className='active' >Old Password </label>
                {/* {errors.password && <span className='error1'>{errors.password[0]}</span>} */}
              </div>
              <div className='input-field col s12 m6'>
                <i className='material-icons prefix'>lock</i>
                <input 
                  type='password'
                  onChange = {this.onChange}
                  name='newPassword'
                  className='input-field'
                />
                <label htmlFor='newPassword' className='active' > New Password </label>
                {/* {errors.verifyPassword && <span className='error1'>{errors.verifyPassword[0]}</span>} */}
              </div>
            </div>
            <div className="file-field input-field">
            <div className="btn blue-text white">
              <span>Profile Picture</span>
              <input type="file" name='image' />
            </div>
            <div className="file-path-wrapper">
              <input className="file-path validate" type="text" />
            </div>
          </div>
            <div className="row">
              <div className="input-field col s12 m6 center">
                  <button className="btn-large brown waves-effect waves-light col s12 m4" type="submit">Update Profile
                  </button>
              </div>
            </div>
            
          </form>
        </div>
        </div>
      </div>
    )
  }
}

ProfileEdit.propTypes = {
  profile: PropTypes.object.isRequired,
  handleEditUserProfile: PropTypes.func.isRequired,
  changeMode: PropTypes.func.isRequired
}

export default ProfileEdit;