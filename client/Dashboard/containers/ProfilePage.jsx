import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import ProfileView from '../components/ProfileView';
import ProfileModal from '../components/ProfileModal';
import { handleGetUserProfile } from '../actions';

/**
 * @description renders profile page
 * @param {object} props

 */
export class ProfilePage extends Component {
  /**
   * Creates an instance of ProfilePage.
   * @param {any} props
   * @memberof ProfilePage
   */
  constructor(props) {
    super(props);
    this.state = {
      profile: this.props.profile
    };
  }
  /**
   * @description makes an API call for user Profile on component mount
   * @memberof Dashboard
   * @returns {undefined}
   */
  componentDidMount() {
    if (!this.props.profile.payload.username) {
      this.props.handleGetUserProfile();
    }
  }

  /**
   *@description waits for props to arrive then set state
   * @param {any} nextProps
   * @memberof ProfilePage
   * @returns {undefined}
   */
  componentWillReceiveProps(nextProps) {
    if (this.props.profile !== nextProps.profile) {
      this.setState({ profile: nextProps.profile });
    }
  }

  /**
   * @description renders profile page
   * @returns {ReactElement} - html
   */
  render() {
    return (
      <div>
        <ProfileView profile={this.state.profile} />
        <ProfileModal
          profile={this.state.profile.payload}
          isFetching={this.state.profile.isFetching}
        />
      </div>
    );
  }
}

ProfilePage.propTypes = {
  profile: PropTypes.objectOf(PropTypes.any).isRequired,
  handleGetUserProfile: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile,
});


export default connect(mapStateToProps, { handleGetUserProfile })(ProfilePage);
