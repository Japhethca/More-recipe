import React from 'react';
import PropTypes from 'prop-types';


const TextField = props => (
  <div>
    {props.iconClassName && <i className={props.iconClassName}>{props.iconName}</i>}
    <input
      type={props.type}
      name={props.name}
      value={props.value}
      onChange={event => props.onChange(event)}
      className={props.className}
      placeholder={props.placeholder}
    />
    <label htmlFor={props.name} className={props.labelClass}> {props.label}</label>
    {props.errorText && <span className={props.errorclass}>{props.errorText[0]}</span>}
  </div>
);

TextField.defaultProps = {
  name: '',
  value: '',
  className: '',
  iconClassName: '',
  label: '',
  errorText: '',
  iconName: '',
  type: 'text',
  errorclass: 'errorclass',
  placeholder: '',
  labelClass: ''
};

TextField.propTypes = {
  name: PropTypes.string,
  value: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  className: PropTypes.string,
  iconClassName: PropTypes.string,
  label: PropTypes.string,
  type: PropTypes.string,
  errorText: PropTypes.string,
  iconName: PropTypes.string,
  errorclass: PropTypes.string,
  placeholder: PropTypes.string,
  labelClass: PropTypes.string
};

export default TextField;
