import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { handleUpdateUserProfile } from '../actions';

import '../styles/dashboard.scss';


const propTypes = {
  profile: PropTypes.objectOf(PropTypes.any).isRequired,
  handleUpdateUserProfile: PropTypes.func.isRequired,
  isFetching: PropTypes.bool.isRequired,
};

/**
 * @class ProfileModal
 * @extends {Component}
 */
export class ProfileModal extends Component {
  /**
   * Creates an instance of ProfilePage.
   * @param {Object} props
   * @memberof ProfileModal
   */
  constructor(props) {
    super(props);
    this.state = {
      firstname: this.props.profile.firstname || '',
      lastname: this.props.profile.lastname || '',
      aboutme: this.props.profile.aboutme || '',
      photo: this.props.profile.photo || '',
    };
  }
  /**
   *
   * @memberof ProfilePage
   * @returns {none} - none
   */
  componentDidMount() {
    $('.modal').modal({ dismissible: false });
  }
  /**
   * @description check if profile props is available
   * @param {object} nextProps
   * @returns {undefined}
   */
  componentWillReceiveProps(nextProps) {
    if (nextProps.profile !== this.props.profile) {
      this.setState({
        photo: nextProps.profile.photo,
        firstname: nextProps.profile.firstname,
        lastname: nextProps.profile.lastname,
        aboutme: nextProps.profile.aboutme
      });
    }
  }
  /**
   * @description handles input change
   * @memberof ProfilePage
   * @param {SyntheticEvent} event
   * @returns {undefined}
   */
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

  /**
   *
   * @param {SyntheticEvent} event
   * @memberof ProfilePage
   * @returns {undefined}
   */
  onSubmit = (event) => {
    event.preventDefault();
    this.props.handleUpdateUserProfile(this.state);
  }

  /**
   * @description handles hiding of modal when clicked
   * @param {SyntheticEvent} event
   * @return {undefined}
   */
  onFinishClick = (event) => {
    event.preventDefault();
    $('.modal').modal('close');
  }

  /**
   * @description renders input field
   * @param {string} name
   * @param {string} label
   * @param {string} value
   * @returns {DomElement} - returns html
   */
  renderInputFor = (name, label, value) => (
    <div className="input-field col s12">
      <input
        type="text"
        name={name}
        onChange={this.onChange}
        value={value || ''}
      />
      <label className="active" htmlFor={name}>{label}</label>
    </div>
  );

  /**
   * @description renders profile edit modal
   * @returns {ReactELement} html
   */
  render() {
    return (
      <div className="modal" id="update-modal">
        <div className="row">
          <div className="col s12 m12">
            <div>
              <h4>Edit Profile</h4>
            </div>
            <div className="image-upload">
              <img
                id="img1"
                src={this.state.photo ||
                  'https://res.cloudinary.com/dcmxbxzyj/image' +
                  '/upload/v1511526934/avatar_sq5zgy.png'}
                alt=""
              />
              <div className="upload-btn-wrapper">
                <button className="btn">Upload an Image</button>
                <input
                  type="file"
                  onChange={this.onChange}
                  name="photo"
                  accept=".jpg, .jpeg, .png"
                />
              </div>
            </div>
            <form className="">
              {this.renderInputFor('firstname', 'Firstname', this.state.firstname)}
              {this.renderInputFor('lastname', 'Lastname', this.state.lastname)}
              {this.renderInputFor('aboutme', 'About Me', this.state.aboutme)}
              <button
                className="btn blue"
                type="submit"
                onClick={this.onSubmit}
              >
                {this.props.isFetching ? 'updating...' : 'Update Profile' }
              </button>
              <button
                className="btn grey right"
                type="finish"
                onClick={this.onFinishClick}
              >
                Finish
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

ProfileModal.propTypes = propTypes;


export default connect(null, { handleUpdateUserProfile })(ProfileModal);
