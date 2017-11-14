import React, { Component } from 'react';
import '../styles/sass/landing.scss';

class LandingPage extends Component {
  componentWillMount() {

  }

  componentDidMount() {
    $('.carousel.carousel-slider').carousel({ fullWidth: true });
  }

  render() {
    return (
      <div className="landing-image">
        <h1 className="center white-text">More Recipe</h1>
      </div>
    );
  }
}

LandingPage.propTypes = {

};

export default LandingPage;
