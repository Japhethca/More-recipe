import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import NavigationBar from '../components/navigation/NavigationBar';
import Footer from '../components/navigation/Footer';
import UserProfile from '../components/profile/UserProfile';
import ProfileEdit from '../components/profile/ProfileEdit';
import { handleEditUserProfile } from '../actions/requestHandlers/handleUserProfile';


const propTypes = {
  handleEditUserProfile: PropTypes.func.isRequired,
  profile: PropTypes.objectOf(PropTypes.any).isRequired,
};

class UserProfilePage extends Component {
  componentDidMount() {
    $('ul.tabs').tabs();
  }
  render() {
    return (
      <div>
        <NavigationBar />
        <div className="container">
          <ul className="tabs">
            <li className="tab active"><a href="#profile">My Profile</a></li>
            <li className="tab"><a href="#edit_profile">Edit Profile</a></li>
          </ul>
          <div id="profile">
            <UserProfile profile={this.props.profile} />
          </div>
          <div id="edit_profile">
            <ProfileEdit
              profile={this.props.profile}
              handleEditUserProfile={this.props.handleEditUserProfile}
            />
          </div>
        </div>
        <Footer />
      </div>
    );
  }
}

UserProfilePage.propTypes = propTypes;

const mapStateToProps = state => ({
  profile: state.profile
});

export default connect(mapStateToProps, { handleEditUserProfile })(UserProfilePage);
