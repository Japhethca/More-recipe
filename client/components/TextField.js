import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

class TextField extends React.Component {
  render() {
    return (
      <div className={classnames('input-field col s12 m12',{'red': this.props.error})}>
        <input 
          type={this.props.type}
          name={this.props.name}
          onChange={this.props.onChange}
        />
        <label htmlFor={this.props.name}>{this.props.name} </label>
        {this.props.error && <span> {this.props.error[0]}</span>}
      </div>
    )
  }
}


TextField.propTypes = {
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  type: PropTypes.string.isRequired,
  error: PropTypes.array
}

export default TextField;