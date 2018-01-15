import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import NavigationBar from '../../common/NavigationBar';
import Footer from '../../common/Footer';
import '../syles/landing.scss';


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
          this.props.Authentication.isAuthenticated ? <Redirect to="/recipes" />
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
                  Log In
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

LandingPage.propTypes = {
  Authentication: PropTypes.objectOf(PropTypes.any).isRequired
};

const mapStateToProps = state => ({
  Authentication: state.auth
});

export default connect(mapStateToProps, {})(LandingPage);
