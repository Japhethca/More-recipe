import React, { Component } from 'react';
import PropTypes from 'prop-types';
import NavigationBar from '../components/NavigationBar'

class Wrapper extends Component {
  render() {
    console.log(this.props.children);
    return (
      <div>
        <NavigationBar />
        {this.props.children}
      </div>
    );
  }
}

export default Wrapper;