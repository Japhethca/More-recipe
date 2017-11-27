import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import './loading_indicator.scss';


const propTypes = {
  isLoading: PropTypes.bool.isRequired
};

const LoadingIndicator = (props) => {
  const { isLoading } = props;
  return (
    <div className="loader">
      {isLoading &&
        <div className="preloader-wrapper big active">
          <div className="spinner-layer spinner-blue-only">
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
      }
    </div>
  );
};

LoadingIndicator.propTypes = propTypes;

const mapStateToProps = state => ({
  isLoading: state.isLoading
});

export default connect(mapStateToProps, {})(LoadingIndicator);
