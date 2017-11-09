import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class SearchResultPage extends Component {
  render() {
    let searchResults = this.props.result.map(recipe => <li key={recipe.id}></li>)
    return (
      <div />
    );
  }
}

const mapStateToProps = state => ({
  result: state.search
});


export default connect(mapStateToProps, {})(SearchResultPage);
