import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import qs from 'qs';


import '../search.scss';
import handleSearch from '../actions';


const propTypes = {
  history: PropTypes.objectOf(PropTypes.any).isRequired,
  handleSearch: PropTypes.func.isRequired,

};

class SearchForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      query: qs.parse(this.props.history.location.search, { ignoreQueryPrefix: true }).query || '',
    };
  }

  onChange = (event) => {
    this.setState({ query: event.target.value });
  }

  onSubmit = (event) => {
    event.preventDefault();
    this.props.handleSearch(this.state.query);
    this.props.history.push(`/search?query=${this.state.query}`);
  }

  render() {
    return (
      <div className="search-input">
        <form
          onSubmit={this.onSubmit}
        >
          <div>
            <input
              id="search"
              type="search"
              value={this.state.query}
              required
              autoComplete="off"
              placeholder="search for recipe"
              onChange={this.onChange}
            />
          </div>
        </form>
      </div>
    );
  }
}

SearchForm.propTypes = propTypes;

export default connect(null, { handleSearch })(SearchForm);
