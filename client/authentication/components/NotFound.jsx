import React from 'react';
import { Link } from 'react-router-dom';

import '../styles/authentication.scss';

const NotFound = () => (
  <div className="recipe-not-found container">
    <h4>404</h4>
    <span>Ooops!!! Seems Like the Page/Recipe you
      are looking for has been removed or does not exist.
    </span>
    <br />
    <span> Go back to
      <Link to="/recipes" className="home" href> HomePage </Link>
    </span>
  </div>
);

export default NotFound;
