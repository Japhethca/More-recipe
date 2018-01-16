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


/**
 * @description navigation bar search input form
 * @class SearchForm
 * @extends {Component}
 */
export class SearchForm extends Component {
  /**
   * @description Creates an instance of SearchForm.
   * @param {object} props
   * @memberof SearchForm
   */
  constructor(props) {
    super(props);
    this.state = {
      query: qs.parse(this.props.history.location.search, { ignoreQueryPrefix: true }).query || ''
    };
  }

  /**
   * @description handles changes when user types
   * @memberof SearchForm
   * @param {SyntheticElement} event
   * @return {undefined}
   */
  onChange = (event) => {
    this.setState({ query: event.target.value });
  }

  /**
  * @description handles submiting search change
  * @memberof SearchForm
  * @param {SyntheticEvent} event
  * @returns {undefined}
  */
  onSubmit = (event) => {
    event.preventDefault();
    this.props.history.push(`/search?query=${this.state.query}`);
    this.props.handleSearch(this.state.query);
  }

  /**
   * @description renders search input
   * @return {ReactElement} markup
   */
  render() {
    return (
      <div className="search-input">
        <form onSubmit={this.onSubmit} >
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
