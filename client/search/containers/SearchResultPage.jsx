import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import qs from 'qs';

import { Recipes } from '../../recipes';
import handleSearch from '../actions';

const propTypes = {
  results: PropTypes.arrayOf(PropTypes.object).isRequired,
  history: PropTypes.objectOf(PropTypes.any).isRequired,
  handleSearch: PropTypes.func.isRequired,
};

/**
 * @class SearchResultPage
 * @extends {Component}
 */
class SearchResultPage extends Component {
  /**
   * Creates an instance of SearchResultPage.
   * @param {Object} props
   * @memberof SearchResultPage
   */
  constructor(props) {
    super(props);
    this.state = {
      query: this.props.history.location.search,
      searchResults: this.props.results
    };
  }

  /**
   * @memberof SearchResultPage
   * @returns {undefined}
   */
  componentDidMount() {
    const { query } = qs.parse(this.state.query, { ignoreQueryPrefix: true });
    this.props.handleSearch(query);
  }

  /**
   * @param {object} nextProps
   * @memberof SearchResultPage
   * @returns {undefined}
   */
  componentWillReceiveProps(nextProps) {
    if (nextProps.history.location.search !== this.props.history.location.search) {
      this.props.handleSearch(nextProps.history.location.search);
      this.setState({ query: nextProps.history.location.search });
    }
    if (nextProps.results !== this.props.results) {
      this.setState({ searchResults: nextProps.results });
    }
  }

  /**
   * @returns {ReactElement} - markup
   */
  render() {
    const { query } = qs.parse(this.props.history.location.search, { ignoreQueryPrefix: true });
    const results = this.state.searchResults;
    return (
      <div className="container">
        <div >
          <h4> { this.state.searchResults.length < 1
            ? 'No' : this.state.searchResults.length } Search Result(s) for <span> &quot;{query}&quot;</span>
          </h4>
          <Recipes recipes={results} noItemText="  " />
        </div>
      </div>
    );
  }
}

SearchResultPage.propTypes = propTypes;

const mapStateToProps = state => ({
  results: state.results
});


export default withRouter(connect(mapStateToProps, { handleSearch })(SearchResultPage));
