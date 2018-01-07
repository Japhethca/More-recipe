import React from 'react';
import PropTypes from 'prop-types';
import { GridLoader } from 'react-spinners';

import './loader.scss';

/**
 * @description displays loading indicator
 * @param {Object} props
 * @returns {ReactElement} markup
 */
const Loader = props => (
  <div className="sweet-loading">
    <GridLoader
      color="rgb(223, 63, 63)"
      loading={props.isFetching}
    />
  </div>
);

Loader.propTypes = {
  isFetching: PropTypes.bool
};

Loader.defaultProps = {
  isFetching: false
};

export default Loader;
