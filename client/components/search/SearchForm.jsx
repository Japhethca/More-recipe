import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { SEARCH_RECIPE } from '../../actions/types';
import './search.scss';


const propTypes = {
  recipes: PropTypes.array.isRequired,
};

class SearchForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchResults: [],
      isSearching: true,
    };
    this.onSubmit = this.onSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
    this.handdleSearch = this.handleSearch.bind(this);
    this.onBlur = this.onBlur.bind(this);
    this.onFocus = this.onFocus.bind(this);
  }

  onChange(e) {
    this.handdleSearch(e.target.value);
  }
  onFocus() {
    this.setState({ isSearching: true });
    console.log('focusing');
    return true;
  }
  onBlur() {
    this.setState({ isSearching: false });
    console.log('blurring div');
  }
  onSubmit() {
    this.props.history.push('/');
  }

  handleSearch(keywords) {
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
    if (!keywords || keywords === ' ' || this.state.keywords === '') {
      this.setState({ searchResults: [] });
    } else {
      this.setState({ searchResults: results });
    }
  }
  render() {
    return (
      <div>
        <form className="row" onSubmit={this.onSubmit} >
          <div className="input-field col s12 m8 offset-m2">
            <span className="search-btn right" ><i className="material-icons prefix">search</i></span>
            <input id="search" list="results" type="search" required onChange={this.onChange} autoFocus autoComplete="off" onFocus={this.onFocus} />
            <div className="search-result" tabIndex="0" onBlur={this.onBlur} >
              <ul id="results">
                {this.state.searchResults && this.state.searchResults.map(recipe =>
                  <a key={recipe.id} className="itemLink" href={`/recipe/${recipe.id}`} ><img src={recipe.image} alt="" /><span>{recipe.name }</span></a>)}
              </ul>
            </div>
          </div>
        </form>
      </div>
    );
  }
}

SearchForm.propTypes = propTypes;

const mapStateToProps = state => ({
  recipes: state.recipes
});


export default connect(mapStateToProps, {})(SearchForm);
