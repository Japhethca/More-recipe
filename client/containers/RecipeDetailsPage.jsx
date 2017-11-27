import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import NavigationBar from '../components/navigation/NavigationBar';
import Footer from '../components/navigation/Footer';
import RecipeDetails from '../components/recipeDetails/RecipeDetails';


const propTypes = {
  match: PropTypes.objectOf(PropTypes.any).isRequired,
  reviews: PropTypes.arrayOf(PropTypes.object).isRequired,
  recipes: PropTypes.arrayOf(PropTypes.object).isRequired,
  favorites: PropTypes.arrayOf(PropTypes.object).isRequired,
  history: PropTypes.objectOf(PropTypes.any).isRequired
};

const RecipeDetailsPage = props => (
  <div>
    <NavigationBar />
    <div className="container">
      <RecipeDetails
        history={props.history}
        match={props.match}
        favorites={props.favorites}
        reviews={props.reviews}
        recipes={props.recipes}
      />
    </div>
    <Footer />
  </div>
);
RecipeDetailsPage.propTypes = propTypes;

const mapStateToProps = state => ({
  favorites: state.favorites,
  reviews: state.reviews,
  recipes: state.recipes,
});


export default withRouter(connect(mapStateToProps, {})(RecipeDetailsPage));
