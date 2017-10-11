import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {connect } from 'react-redux';
import getUserDetail from '../../actions/requestHandlers/getUserDetail';

class UserDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: ''
    }
  }
  componentDidMount(){
    this.props.getUserDetail(this.props.userId).then(
      res => this.setState({user: res.data})
    );
  }

  render() {
    const {user} = this.state;
    return (
      <div>
        {user && <p>{`By ${user.firstname} ${user.lastname}`}</p>}
      </div>
    );
  }
}

UserDetail.propTypes = {
  userId: PropTypes.number.isRequired,
  getUserDetail: PropTypes.func.isRequired
};

export default connect(null, {getUserDetail})(UserDetail)