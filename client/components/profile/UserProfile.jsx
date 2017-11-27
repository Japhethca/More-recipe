import React from 'react';
import PropTypes from 'prop-types';
import './profile.scss';


const propTypes = {
  profile: PropTypes.objectOf(PropTypes.any).isRequired
};

const UserProfile = (props) => {
  const { profile } = props;
  return (
    <div className="row ">
      <div className="profile-page center col s12 m6 offset-m3 z-depth-2">
        <hr />
        <h4>My Profile</h4>
        <hr />
        <div>
          <img src={profile.photo || 'http://res.cloudinary.com/dcmxbxzyj/image/upload/v1511526934/avatar_sq5zgy.png'} alt="" className="center profile-image" />
          <h4 className="profile-name">{profile.firstname} {profile.lastname}</h4>
        </div>
        <div className="profile-details">
          <ul id="profile-page-about-details" className="collection">
            <li className="collection-item">
              <div className="row">
                <div className="col s5 grey-text darken-1"><i className="material-icons" /> First Name</div>
                <div className="col s7 grey-text text-darken-4 right-align">{profile.firstname}</div>
              </div>
            </li>
            <li className="collection-item">
              <div className="row">
                <div className="col s5 grey-text darken-1"><i className="material-icons" /> Last Name</div>
                <div className="col s7 grey-text text-darken-4 right-align">{profile.lastname}</div>
              </div>
            </li>
            <li className="collection-item">
              <div className="row">
                <div className="col s5 grey-text darken-1"><i className="material-icons" />Username</div>
                <div className="col s7 grey-text text-darken-4 right-align">{profile.username}</div>
              </div>
            </li>
            <li className="collection-item">
              <div className="row">
                <div className="col s5 grey-text darken-1"><i className="material-icons" />Email</div>
                <div className="col s7 grey-text text-darken-4 right-align">{profile.email}</div>
              </div>
            </li>
            <div className="card grey">
              <div className="card-content white-text">
                <span className="card-title">About Me!</span>
                <p>{profile.aboutme || 'Say something about you.'}</p>
              </div>
            </div>
          </ul>
        </div>
      </div>

    </div>

  );
};

UserProfile.propTypes = propTypes;

export default UserProfile;
