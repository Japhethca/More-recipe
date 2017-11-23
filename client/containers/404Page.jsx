import React, { Component } from 'react';
import NavigationBar from '../components/navigation/NavigationBar';

class NotFoundPage extends Component {
  render() {
    return (
      <div>
        <NavigationBar />
        <div className="container red-text">

          <h4 className="center"> 404 </h4>
          <h4 className="center">PAGE DOES NOT EXIST</h4>
        </div>
      </div>
    );
  }
}
export default NotFoundPage;
