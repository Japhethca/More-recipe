import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import qs from 'qs';

import Loader from '../../common/Loader';
import Recipes from '../../Recipes';
import handleSearch from '../actions';

const propTypes = {
  results: PropTypes.objectOf(PropTypes.any).isRequired,
  history: PropTypes.objectOf(PropTypes.any).isRequired,
  handleSearch: PropTypes.func.isRequired,
};

/**
 * @description Search result page
 * @class SearchPage
 * @extends {Component}
 */
export class SearchPage extends Component {
  /**
   * @description Creates an instance of SearchPage.
   * @param {Object} props
   * @memberof SearchPage
   */
  constructor(props) {
    super(props);
    this.state = {
      query: this.props.history.location.search,
      searchResults: this.props.results || [],

    };
  }

  /**
   * @description makes an api search when component mounts
   * @memberof SearchPage
   * @returns {undefined}
   */
  componentDidMount() {
    const { query } = qs.parse(this.state.query, { ignoreQueryPrefix: true });
    this.props.handleSearch(query);
  }

  /**
   * @description checks if location and results are available in props
   * @param {object} nextProps
   * @memberof SearchPage
   * @returns {undefined}
   */
  componentWillReceiveProps(nextProps) {
    if (nextProps.history.location.search
      !== this.props.history.location.search) {
      this.props.handleSearch(nextProps.history.location.search);
      this.setState({ query: nextProps.history.location.search });
    }
    if (nextProps.results !== this.props.results) {
      this.setState({ searchResults: nextProps.results });
    }
  }


  /**
   * @description renders page for listing search results
   * @returns {ReactElement} - markup
   */
  render() {
    const { query } = qs
      .parse(this.props.history.location.search, { ignoreQueryPrefix: true });
    const results = this.state.searchResults.payload;
    return (
      <div className="container search-page">
        {
          this.props.results.isFetching ? <Loader isFetching /> :

          <div >
            <h4> { results.length < 1
            ? 'No' : results.length } Search Result(s) for
            <span> &quot;{query}&quot;</span>
            </h4>
            <Recipes recipes={results} noItemText="  " />
          </div>
        }
      </div>
    );
  }
}

SearchPage.propTypes = propTypes;

const mapStateToProps = state => ({
  results: state.results,
});


export default withRouter(connect(
  mapStateToProps,
  { handleSearch }
)(SearchPage));
