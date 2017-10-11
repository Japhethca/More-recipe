import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import NavigationBar from '../components/NavigationBar';
import Footer from '../components/Footer';
import UserProfile from '../components/userComponent/UserProfile';
import ProfileEdit from '../components/userComponent/ProfileEdit';
import {handleGetUserProfile, handleEditUserProfile  } from '../actions/requestHandlers/handleUserProfile';


class UserProfilePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isEditingProfile: false,
    };
    this.changeMode = this.changeMode.bind(this);
  }
  changeMode(mode){
    this.setState({isEditingProfile: mode})
  }

  componentDidMount(){
    this.props.handleGetUserProfile();
  }
  render() {
    const {isEditingProfile} = this.state;
    const profile = this.props.profile;
    console.log(profile);
    return (
      <div>
        <NavigationBar />
        <div className='container'>
          {
          isEditingProfile ? (
            <div className=''>
              <ProfileEdit changeMode={this.changeMode} profile={this.props.profile}
                handleEditUserProfile={this.props.handleEditUserProfile} />
            </div>
            
          )
           
          : <UserProfile changeMode={this.changeMode} profile={this.props.profile} />
        }
        </div>
        <Footer />
      </div>
    );
  }
}

UserProfilePage.propTypes = {
  handleGetUserProfile: PropTypes.func.isRequired,
  handleEditUserProfile: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => {
  return {
    profile: state.profile
  }
};

export default connect(mapStateToProps, {handleGetUserProfile, handleEditUserProfile})(UserProfilePage);