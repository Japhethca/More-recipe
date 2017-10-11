import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import NavigationBar from '../components/NavigationBar';
import Footer from '../components/Footer';
import TopRecipes from '../components/recipeComponents/TopRecipe';
import getAllRecipes from '../actions/requestHandlers/getAllRecipes';
import getAllReview from '../actions/requestHandlers/getReviews';


class Home extends Component {
  componentDidMount(){
    this.props.getAllRecipes();
    this.props.getAllReview();
  }
  render() {
    return (
      <div id='main'>
        <NavigationBar />
        <TopRecipes history={this.props.history} />
        <Footer/>
      </div>
    )
  }
}

Home.propTypes = {
  history: PropTypes.object.isRequired,
  getAllRecipes: PropTypes.func.isRequired,
  getAllReview: PropTypes.func.isRequired
};

export default connect(null, {getAllRecipes, getAllReview})(Home);