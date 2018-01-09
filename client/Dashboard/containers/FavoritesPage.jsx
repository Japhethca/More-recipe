import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import qs from 'qs';

import Recipes from '../../Recipes';
import { handleGetFavorites } from '../actions';
import Loader from '../../common/Loader';
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
      favorites: this.props.favorites.payload,
      page: this.props.history.location.search
    };
  }

  /**
 * @memberof FavoritesPage
 * @returns {undefined}
 */
  componentDidMount() {
    const { page } = qs.parse(this.state.page, { ignoreQueryPrefix: true });
    this.props.handleGetFavorites(page);
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
      this.setState({ favorites: nextProps.favorites.payload });
    }
    if (nextProps.history.location.search !== this.props.history.location.search) {
      this.setState({ page: nextProps.history.location.search });
    }
  }

  /**
   *@description handles pagination page click
   * @param {object} page
   * @memberof FavoritesPage
   * @returns {undefined}
   */
  handlePagination = (page) => {
    this.props.history.push(`/favorites?page=${page.selected + 1}`);
    this.props.handleGetFavorites(page.selected + 1);
  }

  /**
 * @description rendesr users favorite recipes
 * @returns {ReactElement} markup
 */
  render() {
    const { isFetching } = this.props.favorites;

    return (
      <div>
        {
          isFetching ? <Loader isFetching />
          :
          <div>
            <Recipes
              recipes={this.state.favorites}
              showActionBtns={false}
              showRemoveFavorite
              className="col s12 m6 l4"
              noItemText="You do not have favorite recipes!"
            />
            { this.state.favorites.length > 0 &&
              <Pagination
                handlePagination={this.handlePagination}
                totalPages={this.props.favorites.totalPages || 0}
                currentPage={this.props.favorites.currentPage - 1 || 0}
              />
            }
          </div>
        }
      </div>
    );
  }
}

FavoritesPage.propTypes = {
  favorites: PropTypes.objectOf(PropTypes.shape).isRequired,
  handleGetFavorites: PropTypes.func.isRequired,
  history: PropTypes.objectOf(PropTypes.shape).isRequired,
};

const mapStateToProps = state => ({
  favorites: state.recipeReducer.favorites,
});

export default connect(mapStateToProps, { handleGetFavorites })(FavoritesPage);
