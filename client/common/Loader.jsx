import React from 'react';
import PropTypes from 'prop-types';
// import PreLoader from 'react-loaders';
// import './loader.scss';


const Loader = props => (
  <div className="loader-class">
    <div className="preloader-wrapper active">
      <div className="spinner-layer spinner-red-only">
        <div className="circle-clipper left">
          <div className="circle" />
        </div>
        <div className="gap-patch">
          <div className="circle" />
        </div>
        <div className="circle-clipper right">
          <div className="circle" />
        </div>
      </div>
    </div>
  </div>
);

Loader.propTypes = {

};


export default Loader;
