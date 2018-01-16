import React from 'react';
import PropTypes from 'prop-types';

const propTypes = {
  text: PropTypes.string,
  type: PropTypes.string,
  className: PropTypes.string,
  textColor: PropTypes.string,
  backgroundColor: PropTypes.string,
};

const defaultProps = {
  text: '',
  type: '',
  className: '',
  textColor: '',
  backgroundColor: '',
};

/**
 * @description button component
 * @param {object} props - React props
 * @returns {ReactElement} markup
 */
const Button = props => (
  <div>
    <button
      type={props.type}
      className={props.className}
      style={{ color: props.textColor, backgroundColor: props.backgroundColor }}
    >
      {props.text}
    </button>
  </div>
);

Button.propTypes = propTypes;

Button.defaultProps = defaultProps;

export default Button;
