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
      <div classn="carousel carousel-slider">
        <a classn="carousel-item" href="#one!"><img src="https://lorempixel.com/800/400/food/1" /></a>
      </div>
    );
  }
}

LandingPage.propTypes = {

};

export default LandingPage;
