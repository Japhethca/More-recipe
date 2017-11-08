import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import NavigationBar from '../components/NavigationBar';
import Footer from '../components/Footer';
import RecipeDetails from '../components/recipeComponents/RecipeDetails';

class RecipeDetailsPage extends Component {
  render() {
    return (
      <div>
        <NavigationBar />
        <div className="container">
          <RecipeDetails match={this.props.match} favorites={this.props.favorites} />
        </div>
        <Footer />
      </div>
    );
  }
}
RecipeDetailsPage.propTypes = {
  match: PropTypes.object.isRequired,
};
const mapStateToProps = state => ({
  favorites: state.favorites
});


export default withRouter(connect(mapStateToProps, {})(RecipeDetailsPage));
