import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import handleSearch from '../../actions/requestHandlers/handleSearch';
import { SEARCH_RECIPE } from '../../actions/types';
import './search.scss';


const propTypes = {
  recipes: PropTypes.array.isRequired,
  handleSearch: PropTypes.func.isRequired,
};

class SearchForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchResults: [],
      isSearching: true,
      query: '',
    };
    this.onSubmit = this.onSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
    this.handdleSearch = this.handleSearch.bind(this);
  }

  onChange(e) {
    this.handdleSearch(e.target.value);
  }

  onSubmit(e) {
    e.preventDefault();
    this.props.handleSearch({ result: this.state.searchResults, query: this.state.query });
    this.props.history.push('/search');
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
      this.setState({ searchResults: results, query: keywords });
    }
  }
  render() {
    return (
      <li>
        <form className="navigation-search c right" onSubmit={this.onSubmit}>
          <div className="input-field">
            <input
              id="search"
              type="search"
              required
              autoFocus
              placeholder="search for recipe"
              onChange={this.onChange}
            />
            <label className="label-icon" htmlFor="search"><i className="material-icons">search</i></label>
          </div>
        </form>
      </li>
    // <div>
    //   <form className="row" onSubmit={this.onSubmit} >
    //     <div className="input-field col s12 m8 offset-m2">
    //       <span className="search-btn right" ><i className="material-icons prefix">search</i></span>
    //       <input id="search" list="results" type="search" required onChange={this.onChange} autoFocus autoComplete="off" onFocus={this.onFocus} />
    //       <div className="search-result" tabIndex="0" onBlur={this.onBlur} >
    //         <ul id="results">
    //           {this.state.searchResults && this.state.searchResults.map(recipe =>
    //             <a key={recipe.id} className="itemLink" href={`/recipe/${recipe.id}`} ><img src={recipe.image} alt="" /><span>{recipe.name }</span></a>)}
    //         </ul>
    //       </div>
    //     </div>
    //   </form>
    // </div>
    );
  }
}

SearchForm.propTypes = propTypes;

const mapStateToProps = state => ({
  recipes: state.recipes
});


export default connect(mapStateToProps, { handleSearch })(SearchForm);
