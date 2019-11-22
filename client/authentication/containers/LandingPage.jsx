import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import NavigationBar from '../../common/NavigationBar';
import Footer from '../../common/Footer';
import '../styles/landing.scss';

const propTypes = {
  authentication: PropTypes.objectOf(PropTypes.any).isRequired
};

/**
 * @description displays landing page
 * @returns {ReactElement} markup
 */
export class LandingPage extends Component {
  /**
   * @returns {ReactElement} markup
   * @memberof LandingPage
   */
  render() {
    return (
      <div>
        {
          this.props.authentication.isAuthenticated
          ?
            <Redirect to="/recipes" />
        :
            <div className="landing-image">
              <NavigationBar bgColor="#e4e2dc94" />
              <div className="wrapper">
                <div className="quote-text">
                Find and Share Best and Exciting Recipes
                </div>
                <div className="authenticate">
                  <h4>Start Your Cooking Journey</h4>
                  <div id="main">
                    <Link to="/signup" href="/signup" className="landing-btn">
                    Register Now
                    </Link>
                  Or
                <Link to="/signin" href="/signin" className="landing-btn">
                  Sign In
                </Link>
                  </div>
                </div>
              </div>
              <Footer />
            </div>
        }
      </div>
    );
  }
}

LandingPage.propTypes = propTypes;

const mapStateToProps = state => ({
  authentication: state.auth
});

export default connect(mapStateToProps, {})(LandingPage);
