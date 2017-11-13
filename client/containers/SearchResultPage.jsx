import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import NavigationBar from '../components/navigation/NavigationBar';
import Recipe from '../components/recipe/Recipe';

const propTypes = {
  favorites: PropTypes.array.isRequired,
  search: PropTypes.object.isRequired,
};
class SearchResultPage extends Component {
  render() {
    let searchResults = [];
    if (this.props.search.query !== null) {
      searchResults = this.props.search.result.map(recipe =>
        (
          <li key={recipe.id} className="col s12 m4 l4">
            <Recipe
              recipe={recipe}
              favorites={this.props.favorites}
            />
          </li>));
    }
    return (
      <div>
        <NavigationBar />
        <div className="container">
          <h4> { searchResults.length < 1 ? 'No' : ''} Search Results for {this.props.search.query ? this.props.search.query : " "}...</h4>
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
  search: state.search,
  favorites: state.favorites
});


export default connect(mapStateToProps, {})(SearchResultPage);
