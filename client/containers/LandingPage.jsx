import React, { Component } from 'react';
import '../styles/sass/landing.scss';
import NavigationBar from '../components/navigation/NavigationBar';

class LandingPage extends Component {
  render() {
    return (
      <div className="landing-image row">
        <NavigationBar bgcolor="transparent" />
        <div className="quote-text col s12 m6 l6">
          <h2 className="header-logo">More Recipes</h2>
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
  }
}

LandingPage.propTypes = {

};

export default LandingPage;
