import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
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
      validationErrors, username, password, firstname, lastname, aboutme, photo
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
                  <i className="material-icons prefix">account_circle</i>
                  <input
                    type="text"
                    onChange={this.onChange}
                    name="firstname"
                    value={firstname}
                    className="input-field"
                  />
                  <label htmlFor="firstname" className="active" > Firstname </label>
                  {validationErrors.firstname && <span className="error-text"> { validationErrors.firstname[0] }</span>}
                </div>

                <div className="input-field col s12 m6">
                  <i className="material-icons prefix">account_circle</i>
                  <input
                    type="text"
                    onChange={this.onChange}
                    name="lastname"
                    value={lastname}
                    className="input-field"
                  />
                  <label htmlFor="lastname" className="active"> Lastname </label>
                  {validationErrors.lastname && <span className="error-text"> { validationErrors.lastname[0] }</span>}
                </div>
              </div>
              <div className="row" >
                <div className="input-field col s12 m6">
                  <i className="material-icons prefix">person_outline</i>
                  <input
                    type="text"
                    onChange={this.onChange}
                    name="username"
                    value={username}
                    className="input-field"
                  />
                  <label htmlFor="username" className="active" > Username </label>
                  {validationErrors.username && <span className="error-text"> { validationErrors.username[0] }</span>}
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
                  <i className="material-icons prefix">lock</i>
                  <input
                    type="password"
                    onChange={this.onChange}
                    name="password"
                    value={password}
                    className="input-field"
                    disabled
                  />
                  <label htmlFor="password" className="active" >Old Password </label>
                  {validationErrors.password && <span className="error-text"> { validationErrors.password[0] }</span>}
                </div>
                <div className="input-field col s12 m6">
                  <i className="material-icons prefix">lock</i>
                  <input
                    type="password"
                    onChange={this.onChange}
                    name="newPassword"
                    className="input-field"
                  />
                  <label htmlFor="newPassword" className="active" > New Password </label>
                </div>
              </div>
              <div className="file-field input-field">
                <div className="btn brown waves-effect">
                  <span>Image Upload</span>
                  <input type="file" onChange={this.onChange} name="photo" accept=".jpg, .jpeg, .png" />
                </div>
                <div className="file-path-wrapper">
                  <img id="img1" height={70} className="right" src={photo} />
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
