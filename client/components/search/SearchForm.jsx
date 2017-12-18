import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import handleSearch from '../../actions/requestHandlers/handleSearch';
import './search.scss';


const propTypes = {
  history: PropTypes.objectOf(PropTypes.any).isRequired,
  handleSearch: PropTypes.func.isRequired,
};

class SearchForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      query: '',
    };
  }

  onChange = (event) => {
    this.setState({ query: event.target.value });
  }

  onSubmit = (event) => {
    event.preventDefault();
    this.props.handleSearch(this.state.query);
    this.props.history.push(`/search/${this.state.query}`);
  }

  render() {
    return (
      <div className="search">
        <form
          className="row"
          onSubmit={this.onSubmit}
        >
          <div className="input-field col s9 m9 l9 search-input">
            <input
              id="search"
              type="search"
              required
              placeholder="search for recipe"
              onChange={this.onChange}
            />
          </div>
          <div className="input-field col s3 m3 l3 search-btn" >
            <button><i className="material-icons">search</i></button>
          </div>
        </form>
      </div>
    );
  }
}

SearchForm.propTypes = propTypes;

export default connect(null, { handleSearch })(SearchForm);
