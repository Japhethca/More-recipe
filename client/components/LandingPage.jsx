import React, { Component } from 'react';
import PropTypes from 'prop-types';
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
        {/* <a classn="carousel-item" href="#two!"><img src="https://lorempixel.com/800/400/food/2"/></a>
    <a classn="carousel-item" href="#three!"><img src="https://lorempixel.com/800/400/food/3"/></a>
    <a classn="carousel-item" href="#four!"><img src="https://lorempixel.com/800/400/food/4"/></a> */}
      </div>
    );
  }
}

LandingPage.propTypes = {

};

export default LandingPage;
