import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {withRouter} from 'react-router-dom';
import NavigationBar from '../components/NavigationBar';
import Footer from '../components/Footer'; 
import {connect} from 'react-redux';
import getReviews from '../actions/requestHandlers/getReviews';
import RecipeDetails from '../components/recipeComponents/RecipeDetails';

 class RecipeDetailsPage extends Component {
  componentDidMount(){
    this.props.getReviews()
  }
  render() {
    return (
      <div>
        <NavigationBar />
        <div className='container'>
          <RecipeDetails match={this.props.match} />
        </div>
        <Footer/>
      </div>
    )
  }
}
RecipeDetailsPage.propTypes = {
  match: PropTypes.object.isRequired,
};

export default withRouter(connect(null, {getReviews})(RecipeDetailsPage));
