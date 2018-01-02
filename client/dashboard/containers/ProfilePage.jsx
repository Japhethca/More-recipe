import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { profileUpdateFormValidator } from '../../utilities/validators';
import { handleEditUserProfile } from '../actions';
import ProfileView from '../components/ProfileView';
import ProfileModal from '../components/ProfileModal';


class ProfilePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstname: this.props.profile.firstname,
      lastname: this.props.profile.lastname,
      aboutme: this.props.profile.aboutme,
      photo: this.props.profile.photo,
      validationErrors: {},
      profile: this.props.profile
    };
  }
  componentDidMount() {
    $('.modal').modal();
  }
  componentWillReceiveProps(nextProps) {
    if (this.props.profile !== nextProps.profile) {
      this.setState({ ...nextProps.profile, profile: nextProps.profile });
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
    const updateData = {
      photo: this.state.photo,
      aboutme: this.state.aboutme,
      firstname: this.state.firstname,
      lastname: this.state.lastname
    };
    return (
      <div>
        <ProfileView profile={this.state.profile} />
        <ProfileModal
          profile={this.state.profile}
          onChange={this.onChange}
          onSubmit={this.onSubmit}
        />
      </div>
    );
  }
}

ProfilePage.propTypes = {
  handleEditUserProfile: PropTypes.func.isRequired,
  profile: PropTypes.objectOf(PropTypes.any).isRequired
};

const mapStateToProps = state => ({
  profile: state.profile
});


export default connect(mapStateToProps, { handleEditUserProfile })(ProfilePage);
