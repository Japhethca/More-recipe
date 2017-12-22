import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import TextField from '../common/TextField';
import LoadingIndicator from '../common/LoadingIndicator';
import { profileUpdateFormValidator } from '../../utils/validators';
import './profile.scss';


const propTypes = {
  profile: PropTypes.objectOf(PropTypes.any).isRequired,
  handleEditUserProfile: PropTypes.func.isRequired,
};

class ProfileEdit extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstname: this.props.profile.firstname,
      lastname: this.props.profile.lastname,
      username: this.props.profile.username,
      aboutme: this.props.profile.aboutme,
      password: this.props.profile.password,
      newPassword: null,
      photo: this.props.profile.photo,
      validationErrors: ''
    };
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.profile !== nextProps.profile) {
      this.setState(Object.assign({}, nextProps.profile));
    }
  }

  onChange = (event) => {
    if (event.target.name === 'photo') {
      this.setState({ photo: event.target.files[0] });
      const reader = new FileReader();
      reader.onload = () => {
        const output = document.getElementById('img1');
        output.src = reader.result;
      };
      reader.readAsDataURL(event.target.files[0]);
    } else {
      this.setState({ [event.target.name]: event.target.value });
    }
  }

  onSubmit = (event) => {
    event.preventDefault();
    if (this.isValid()) {
      this.props.handleEditUserProfile(this.state);
    }
  }

  isValid = () => {
    const { errors, isValid } = profileUpdateFormValidator(this.state);
    if (!isValid) {
      this.setState({ validationErrors: errors });
    }
    return isValid;
  }

  render() {
    const {
      validationErrors, aboutme, photo
    } = this.state;
    return (
      <div>
        <div className="row profile-form">
          <div className="card-panel col s12 m12 l8 offset-l2 z-depth-4">
            <div className="input-field s12 center signup-text">
              <h4>EDIT YOUR PROFILE</h4>
            </div>
            <form className="" onSubmit={this.onSubmit}>
              <div className="row">
                <div className="input-field col s12 m6">
                  <TextField
                    name="firstname"
                    value={this.state.firstname}
                    className="input-field"
                    onChange={this.onChange}
                    iconClassName="material-icons prefix"
                    iconName="account_circle"
                    label="Firstname"
                    errorClass="error-text"
                    errorText={validationErrors.firstname}
                  />
                </div>

                <div className="input-field col s12 m6">
                  <TextField
                    name="lastname"
                    value={this.state.lastname}
                    className="input-field"
                    onChange={this.onChange}
                    iconClassName="material-icons prefix"
                    iconName="account_circle"
                    label="Lastname"
                    errorClass="error-text"
                    errorText={validationErrors.lastname}
                  />
                </div>
              </div>
              <div className="row" >
                <div className="input-field col s12 m6">
                  <TextField
                    name="username"
                    value={this.state.username}
                    className="input-field"
                    onChange={this.onChange}
                    iconClassName="material-icons prefix"
                    iconName="person_outline"
                    label="Username"
                    errorClass="error-text"
                    errorText={validationErrors.username}
                  />
                </div>
                <div className="input-field col s12 m6">
                  <i className="material-icons prefix">mail</i>
                  <textarea
                    type="text"
                    onChange={this.onChange}
                    name="aboutme"
                    value={aboutme || ' '}
                    className="materialize-textarea"
                  />
                  <label htmlFor="aboutme" className="active" > About Me </label>
                </div>
              </div>
              <div className="row">
                <div className="input-field col s12 m6">
                  <TextField
                    name="password"
                    value={this.state.password}
                    className="input-field"
                    onChange={this.onChange}
                    iconClassName="material-icons prefix"
                    iconName="lock"
                    label="Password"
                    type="password"
                    errorClass="error-text"
                    errorText={validationErrors.password}
                  />
                </div>
                <div className="input-field col s12 m6">
                  <TextField
                    name="newPassword"
                    value={this.state.newPassword}
                    className="input-field"
                    onChange={this.onChange}
                    iconClassName="material-icons prefix"
                    iconName="lock"
                    label="New Password"
                    type="password"
                    errorClass="error-text"
                    errorText={validationErrors.newPassword}
                  />
                </div>
              </div>
              <div className="file-field input-field">
                <div className="btn brown waves-effect">
                  <span>Image Upload</span>
                  <input type="file" onChange={this.onChange} name="photo" accept=".jpg, .jpeg, .png" />
                </div>
                <div className="file-path-wrapper">
                  <img id="img1" height={70} className="right" src={photo} alt="" />
                </div>
                <LoadingIndicator />
              </div>
              <div className="row">
                <div className="input-field col s12 m6 center">
                  <button
                    className="btn-large brown waves-effect waves-light col s12 m4"
                    type="submit"
                  >
                    Update Profile
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

ProfileEdit.propTypes = propTypes;


export default connect(null, {})(ProfileEdit);
