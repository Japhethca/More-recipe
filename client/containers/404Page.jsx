import React from 'react';
import NavigationBar from '../components/navigation/NavigationBar';

const NotFoundPage = () => (
  <div>
    <NavigationBar />
    <div className="container red-text">
      <h4 className="center"> 404 </h4>
      <h4 className="center">PAGE DOES NOT EXIST</h4>
    </div>
  </div>
);

export default NotFoundPage;
