import React from 'react';
import PropTypes from 'prop-types';
import '../syles/authentication.scss';


const propTypes = {
  user: PropTypes.objectOf(PropTypes.any).isRequired,
};

/**
 * @description displays user details
 * @param {object} props - React props
 * @returns {ReactElement} markup
 */
const UserDetail = props => (
  <div className="user-details">
    {props.user && <p>By <span>{props.user.username}</span> </p>}
  </div>
);

UserDetail.propTypes = propTypes;

export default UserDetail;
