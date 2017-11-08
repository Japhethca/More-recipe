import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';


class SearchForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      keywords: '',
      searchResults: []
    };
    this.onSubmit = this.onSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
    this.handdleSearch = this.handleSearch.bind(this);
  }
  onChange(e) {
    this.setState({ keywords: e.target.value });
  }
  onSubmit(e) {
    e.preventDefault();
    this.handleSearch();
  }
  handleSearch() {
    const results = this.props.recipes.filter((recipe) => {
      const keywordList = this.state.keywords.split(' ');
      if (!this.state.keywords || this.state.keywords === ' ' || this.state.keywords === '\n') {
        return false;
      } else if (recipe.name.search(this.state.keywords) >= 0 || recipe.ingredients.search(this.state.keywords) >= 0) {
        return true;
      }
      return keywordList.filter(word => recipe.name.includes(word) || recipe.ingredients.includes(word)).length > 0;
    });
    console.log(results);
    this.setState({ searchResults: results });
  }
  render() {
    // console.log(this.props.recipes);
    return (
      <div>
        <form action="" onSubmit={this.onSubmit}>
          <div className="input-field">
            <input type="text" name="search" onChange={this.onChange} />
          </div>
          <div className="input-field">
            <button type="search" className="btn brown lighten-4 black-text">Submit</button>
          </div>

        </form>
      </div>
    );
  }
}

SearchForm.propTypes = {
  recipes: PropTypes.array.isRequired
};
const mapStateToProps = state => ({
  recipes: state.recipes
});


export default connect(mapStateToProps, {})(SearchForm);
