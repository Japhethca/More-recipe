import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import NavigationBar from '../components/navigation/NavigationBar';
import Recipe from '../components/recipe/Recipe';

const propsTypes = {
  favorites: PropTypes.array.isRequired
};
class SearchResultPage extends Component {
  render() {
    const searchResults = this.props.result.map(recipe =>
      (
        <li key={recipe.id}>
          <Recipe
            recipe={recipe}
            favorites={this.props.favorites}
          />
        </li>));
    return (
      <div>
        <NavigationBar />
        {searchResults}
      </div>
    );
  }
}

SearchResultPage.propsTypes = propsTypes;

const mapStateToProps = state => ({
  result: state.search,
  favorites: state.favorites
});


export default connect(mapStateToProps, {})(SearchResultPage);
