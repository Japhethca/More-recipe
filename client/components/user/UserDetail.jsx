import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import getUserDetail from '../../actions/requestHandlers/getUserDetail';
import './userDetails.scss';


const propTypes = {
  user: PropTypes.objectOf(PropTypes.any).isRequired,
};

const UserDetail = props => (
  <div className="user-details">
    {props.user && <p>By <span>{props.user.username}</span> </p>}
  </div>
);

UserDetail.propTypes = propTypes;

export default UserDetail;
