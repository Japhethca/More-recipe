import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import NavigationBar from '../components/NavigationBar';
import Footer from '../components/Footer';
import UserProfile from '../components/userComponent/UserProfile';
import ProfileEdit from '../components/userComponent/ProfileEdit';
import { handleEditUserProfile } from '../actions/requestHandlers/handleUserProfile';


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

UserProfilePage.propTypes = {
  handleEditUserProfile: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  profile: state.profile
});

export default connect(mapStateToProps, { handleEditUserProfile })(UserProfilePage);
