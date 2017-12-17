import React from 'react';
import '../styles/sass/landing.scss';

const LandingPage = () => (
  <div className="landing-image row">
    <div className="quote-text col s12 m6 l6">
            “You don’t have to cook fancy or complicated masterpieces, just good food from fresh ingredients.” <br />
      <span>– Julia Child</span>
    </div>
    <div className="authenticate col s12 m6 l6">
      <h4>Start Your Cooking Journey</h4>
      <button className="landing-btn"> <a href="/signin">Log In </a> </button> Or
          <button className="landing-btn"><a href="signup">Sign Up</a> </button>
    </div>
  </div>
);


export default LandingPage;
