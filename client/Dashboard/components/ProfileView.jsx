import React from 'react';
import PropTypes from 'prop-types';

import Loader from '../../common/Loader';
import '../styles/dashboard.scss';


const propTypes = {
  profile: PropTypes.objectOf(PropTypes.any).isRequired
};

/**
 * @description displays profile data details
 * @returns {ReactElement} markup
 */
const ProfileView = ({ profile }) => (
  <div className="profile-cover">
    {
      profile.isFetching && profile.method === 'GET' ?
        <Loader isFetching />
      :
        <div className="row">
          <div className="col s12 m6 l4">
            <img
              src={profile.payload.photo
                || 'https://res.cloudinary.com/dcmxbxzyj/image/' +
                'upload/v1511526934/avatar_sq5zgy.png'}
              alt=""
              className="profile-image"
            />
          </div>
          <div className="col s12 m6 l8 details">
            <h5>{profile.payload.username}</h5>
            <div>({profile.payload.email})</div>
            {profile.payload.firstname ?
              <div>{profile.payload.firstname} {profile.payload.lastname}</div>
          :
              <div>Update Profile to show real name</div>}
            {profile.payload.aboutme ?
              <div>{profile.payload.aboutme}</div>
              : <div>Update Profile to add about me</div>}
            <a
              className="modal-trigger btn blue"
              href="#update-modal"
            >
              Update Profile
            </a>
          </div>
        </div>
    }
  </div>

);

ProfileView.propTypes = propTypes;

export default ProfileView;
