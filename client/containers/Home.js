import React, { Component } from 'react';
import NavigationBar from '../components/NavigationBar';
import Latest from '../components/Latest';


class Home extends Component {
  render() {
    return (
      <div>
        <NavigationBar />
        <Latest />
      </div>
    )
  }
}

export default Home;