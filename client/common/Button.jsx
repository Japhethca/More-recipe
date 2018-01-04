import React from 'react';
import PropTypes from 'prop-types';

/**
 * button component
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

Button.defaultProps = {
  text: '',
  type: '',
  className: '',
  textColor: '',
  backgroundColor: '',
};

Button.propTypes = {
  text: PropTypes.string,
  type: PropTypes.string,
  className: PropTypes.string,
  textColor: PropTypes.string,
  backgroundColor: PropTypes.string,
};
export default Button;
