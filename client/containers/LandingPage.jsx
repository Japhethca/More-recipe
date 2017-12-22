import React from 'react';
import { Link } from 'react-router-dom';

import Button from '../components/common/Button';
import '../styles/sass/landing.scss';

const LandingPage = () => (
  <div className="landing-image">
    <div className="quote-text col s12">
          “You don’t have to cook fancy or complicated masterpieces,
          just good food from fresh ingredients.” <br />
      <span>– Julia Child</span>
    </div>
    <div className="authenticate col s12">
      <h4>Start Your Cooking Journey</h4>
      <div >
        <Link to="/signin" href="/signin">
          <Button text="Log In" className="landing-btn" />
        </Link>
        Or
        <Link to="/signup" href="/signup">
          <Button text="Sign Up" className="landing-btn" />
        </Link>
      </div>
    </div>
  </div>
);


export default LandingPage;
