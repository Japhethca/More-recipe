import React, { Component } from 'react';
import '../styles/sass/landing.scss';

class LandingPage extends Component {
  render() {
    return (
      <div className="landing-image row">
        <div className="quote-text col s12 m6 l6">
            “You don’t have to cook fancy or complicated masterpieces, just good food from fresh ingredients.” <br />
          <span>– Julia Child</span>
        </div>
        <div className="authenticate col s12 m6 l6">
          <h4>Start Your Cooking Journey</h4>
          <button className="landing-btn">Login</button> or
          <button className="landing-btn">SignUp</button>
          Get <span>More Recipes</span> Now By
        </div>
      </div>
    );
  }
}

LandingPage.propTypes = {

};

export default LandingPage;
