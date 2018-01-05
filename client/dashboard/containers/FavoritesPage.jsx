import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { Recipes } from '../../recipes';
import { handleGetFavorites } from '../actions';
import Pagination from '../../common/Pagination';

/**
 * @class FavoritesPage
 * @extends {Component}
 */
class FavoritesPage extends Component {
/**
 * Creates an instance of FavoritesPage.
 * @param {object} props
 * @memberof FavoritesPage
 */
  constructor(props) {
    super(props);
    this.state = {
      favorites: this.props.favorites
    };
  }

  /**
 * @memberof FavoritesPage
 * @returns {undefined}
 */
  componentDidMount() {
    this.props.handleGetFavorites();
  }

  /**
   *
   *
   * @param {object} nextProps
   * @memberof FavoritesPage
   * @returns {undefined}
   */
  componentWillReceiveProps(nextProps) {
    if (nextProps.favorites !== this.props.favorites) {
      this.setState({ favorites: nextProps.favorites });
    }
  }

  /**
   *@description handles pagination page click
   * @param {object} page
   * @memberof FavoritesPage
   * @returns {undefined}
   */
  handlePagination = (page) => {
    this.props.handleGetFavorites(page.selected + 1);
  }

  /**
 * @description rendesr users favorite recipes
 * @returns {ReactElement} markup
 */
  render() {
    return (
      <div>
        <Recipes
          recipes={this.state.favorites}
          showActionBtns={false}
          showRemoveFavorite
          className="col s12 m6 l4"
          noItemText="You do not have favorite recipes!"
        />
        { this.state.favorites.length > 0 && <Pagination handlePagination={this.handlePagination} />}
      </div>
    );
  }
}

FavoritesPage.propTypes = {
  favorites: PropTypes.arrayOf(PropTypes.any).isRequired,
  handleGetFavorites: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  favorites: state.recipeReducer.favorites
});

export default connect(mapStateToProps, { handleGetFavorites })(FavoritesPage);
