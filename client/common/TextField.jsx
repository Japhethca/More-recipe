import React from 'react';
import PropTypes from 'prop-types';

const propTypes = {
  name: PropTypes.string,
  value: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  className: PropTypes.string,
  iconClassName: PropTypes.string,
  label: PropTypes.string,
  type: PropTypes.string,
  errorText: PropTypes.arrayOf(PropTypes.string),
  iconName: PropTypes.string,
  errorClass: PropTypes.string,
  placeholder: PropTypes.string,
  labelClass: PropTypes.string
};

const defaultProps = {
  name: '',
  value: '',
  className: '',
  iconClassName: '',
  label: '',
  errorText: [],
  iconName: '',
  type: 'text',
  errorClass: '',
  placeholder: '',
  labelClass: ''
};

/**
 * @description displays input field
 * @param {object} props
 * @returns {ReactElement} markup
 */
const TextField = props => (
  <div>
    {props.iconClassName
      && <i className={props.iconClassName}>{props.iconName}</i>}
    <input
      type={props.type}
      name={props.name}
      value={props.value}
      onChange={event => props.onChange(event)}
      className={props.className}
      placeholder={props.placeholder}
    />
    <label
      htmlFor={props.name}
      className={props.labelClass}
    > {props.label}
    </label>
    {
      props.errorText.length > 0 ?
        <span className={props.errorClass}>{props.errorText[0]}</span>
    : <span />
    }
  </div>
);

TextField.defaultProps = defaultProps;

TextField.propTypes = propTypes;

export default TextField;
