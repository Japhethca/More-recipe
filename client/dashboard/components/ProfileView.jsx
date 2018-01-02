import React from 'react';
import PropTypes from 'prop-types';

import '../styles/dashboard.scss';


const propTypes = {
  profile: PropTypes.objectOf(PropTypes.any).isRequired
};

const ProfileView = ({ profile }) => (
  <div>
    <div className="profile-cover row">
      <div className="col s12 m6 l4">
        <img
          src={profile.photo || 'http://res.cloudinary.com/dcmxbxzyj/image/upload/v1511526934/avatar_sq5zgy.png'}
          alt=""
          className="profile-image"
        />
        <a className="modal-trigger update-btn" href="#update-modal">Update Profile</a>
      </div>
      <div className="col s12 m6 l8">
        <h3>{profile.username}</h3><div>({profile.email})</div>
        {profile.firstname ?
          <div>{profile.firstname} {profile.lastname}</div> : <div>Add real name</div>}
        {profile.aboutme ?
          <div>{profile.aboutme}</div> : <div>add about me</div>}
      </div>
    </div>
  </div>

);

ProfileView.propTypes = propTypes;

export default ProfileView;
