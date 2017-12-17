import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import Recipe from '../components/recipe/Recipe';

const propTypes = {
  favorites: PropTypes.arrayOf(PropTypes.object).isRequired,
  recipes: PropTypes.arrayOf(PropTypes.object).isRequired,
  results: PropTypes.arrayOf(PropTypes.object).isRequired,
  match: PropTypes.objectOf(PropTypes.any).isRequired,
};
class SearchResultPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchResults: this.props.results
    };
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.results !== this.props.results) {
      this.setState({ searchResults: nextProps.results });
    }
  }
  handleSearch = (keywords) => {
    const results = this.props.recipes.filter((recipe) => {
      const keywordList = keywords.toLowerCase().split(' ');
      const recipeName = recipe.name.toLowerCase();
      const recipeIngredients = recipe.ingredients.toLowerCase();
      if (!keywords || !keywords === ' ' || !keywords === '\n') {
        return false;
      } else if (recipeName.search(keywords) >= 0 || recipeIngredients.search(keywords) >= 0) {
        return true;
      }
      return keywordList.filter(word => recipeName.includes(word) || recipeIngredients.includes(word)).length > 0;
    });
    return results;
  }

  render() {
    const { query } = this.props.match.params;
    const results = this.state.searchResults;
    const searchResults = results.map(recipe =>
      (
        <li key={recipe.id} className="col s12 m4 l4">
          <Recipe
            recipe={recipe}
            favorites={this.props.favorites}
          />
        </li>));
    return (
      <div>
        <div className="container">
          <h4> { searchResults.length < 1 ? 'No' : searchResults.length } Search Result(s) for <span> "{query}"</span></h4>
          <ul className="row">
            {searchResults}
          </ul>
        </div>
      </div>
    );
  }
}

SearchResultPage.propTypes = propTypes;

const mapStateToProps = state => ({
  recipes: state.recipes,
  favorites: state.favorites,
  results: state.results
});


export default withRouter(connect(mapStateToProps, {})(SearchResultPage));
