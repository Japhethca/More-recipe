import React from 'react';
import PropTypes from 'prop-types';
import NavigationBar from '../components/navigation/NavigationBar';
import Footer from '../components//navigation/Footer';
import Recipes from '../components/recipe/Recipes';


const propTypes = {
  history: PropTypes.objectOf(PropTypes.any).isRequired,
};

const Home = props => (
  <div id="main">
    <NavigationBar />
    <Recipes
      history={props.history}
    />
    <Footer />
  </div>
);

Home.propTypes = propTypes;

export default Home;
