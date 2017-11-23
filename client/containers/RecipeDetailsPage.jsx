import React, { Component } from 'react';
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
  favorites: PropTypes.arrayOf(PropTypes.object).isRequired
};

class RecipeDetailsPage extends Component {
  render() {
    return (
      <div>
        <NavigationBar />
        <div className="container">
          <RecipeDetails
            history={this.props.history}
            match={this.props.match}
            favorites={this.props.favorites}
            reviews={this.props.reviews}
            recipes={this.props.recipes}
          />
        </div>
        <Footer />
      </div>
    );
  }
}
RecipeDetailsPage.propTypes = propTypes;

const mapStateToProps = state => ({
  favorites: state.favorites,
  reviews: state.reviews,
  recipes: state.recipes,
});


export default withRouter(connect(mapStateToProps, {})(RecipeDetailsPage));
