import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import ProfileView from '../components/ProfileView';
import ProfileModal from '../components/ProfileModal';

/**
 * @description renders profile page
 * @param {object} props
 * @returns {ReactElement} - html
 */
const ProfilePage = props => (
  <div>
    <ProfileView profile={props.profile} />
    <ProfileModal profile={props.profile} />
  </div>
);

ProfilePage.propTypes = {
  profile: PropTypes.objectOf(PropTypes.any).isRequired
};

const mapStateToProps = state => ({
  profile: state.profile
});


export default connect(mapStateToProps, {})(ProfilePage);
