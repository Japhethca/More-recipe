import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import TextField from '../../common/TextField';
import '../styles/dashboard.scss';


const propTypes = {
  profile: PropTypes.objectOf(PropTypes.any).isRequired,
  onChange: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired
  // validationErrors: PropTypes.objectOf(PropTypes.any).isRequired
};

/**
 * @description displays proile update modal
 * @returns {ReactElement} markup
 */
const ProfileModal = ({ profile, onChange, onSubmit }) =>
  // const {
  //   validationErrors, aboutme, photo
  // } = this.state;


  (
    <div className="modal" id="update-modal">
      <div className="row">
        <div className="col s12 m4 offset-m4 l4 offset-l4">
          <div className="input-field s12">
            <h4>EDIT YOUR PROFILE</h4>
          </div>
          <form className="" onSubmit={onSubmit}>

            <TextField
              name="firstname"
              value={profile.firstname || ''}
              className="input-field"
              onChange={onChange}
              label="Firstname"
              type="text"
            />


            <TextField
              name="lastname"
              value={profile.lastname || ''}
              className="input-field"
              onChange={onChange}
              label="Lastname"
              type="text"
            />

            <TextField
              name="aboutme"
              value={profile.aboutme || ''}
              className="input-field"
              onChange={onChange}
              label="About Me"
              type="text"
            />
            <button
              className="btn-large brown waves-effect waves-light col s12 m4"
              type="submit"
            >
                    Update Profile
            </button>

          </form>
        </div>
      </div>
    </div>
  );

ProfileModal.propTypes = propTypes;


export default connect(null, {})(ProfileModal);
