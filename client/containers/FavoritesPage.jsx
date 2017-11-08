import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Favorites from '../components/recipeComponents/Favorites';
import NavigationBar from '../components/NavigationBar';
import Footer from '../components/Footer';
import getAllRecipes from '../actions/requestHandlers/getAllRecipes';
import getAllReview from '../actions/requestHandlers/getReviews';


class FavoritesPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      favorites: this.props.favorites,
      hasErrored: false
    };
  }

  render() {
    const { user, favorites, recipes } = this.props;
    const hasFavorites = favorites.length > 0;
    return (
      <div >
        <NavigationBar />
        <div className="container">
          <h3 className="center">Favorite Recipes</h3>
          {hasFavorites ? <Favorites user={user} favorites={favorites} recipes={recipes} /> : (
            <div className="center">
              <h4>Sorry, you have not added any favorite yet!</h4>
              <p>Click on the <i className="material-icons red-text">favorite</i> button on recipe page to add as favorite</p>
            </div>
          )}
        </div>
        {/* <Footer /> */}
      </div>
    );
  }
}

FavoritesPage.propTypes = {
  favorites: PropTypes.array.isRequired,
  user: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  favorites: state.favorites,
  recipes: state.recipes,
  reviews: state.reviews,
  user: state.auth.user
});

export default connect(mapStateToProps, {})(FavoritesPage);
