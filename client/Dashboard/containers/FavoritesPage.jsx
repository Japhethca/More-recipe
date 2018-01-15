import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Recipes from '../../Recipes';
import { handleGetFavorites } from '../actions';
import Loader from '../../common/Loader';

/**
 * @class FavoritesPage
 * @extends {Component}
 */
export class FavoritesPage extends Component {
/**
 * Creates an instance of FavoritesPage.
 * @param {object} props
 * @memberof FavoritesPage
 */
  constructor(props) {
    super(props);
    this.state = {
      favorites: this.props.favorites.payload,
    };
  }

  /**
 * @memberof FavoritesPage
 * @returns {undefined}
 */
  componentDidMount() {
    if (!this.props.favorites.payload.length > 0) {
      this.props.handleGetFavorites();
    }
  }

  /**
   * @param {object} nextProps
   * @memberof FavoritesPage
   * @returns {undefined}
   */
  componentWillReceiveProps(nextProps) {
    if (nextProps.favorites !== this.props.favorites) {
      this.setState({ favorites: nextProps.favorites.payload });
    }
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
          <Recipes
            recipes={this.state.favorites}
            showActionBtns={false}
            showRemoveFavorite
            className="col s12 m6 l4"
            noItemText="You do not have favorite recipes!"
          />
        }
      </div>
    );
  }
}

FavoritesPage.propTypes = {
  favorites: PropTypes.objectOf(PropTypes.shape).isRequired,
  handleGetFavorites: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  favorites: state.recipeReducer.favorites,
});

export default connect(mapStateToProps, { handleGetFavorites })(FavoritesPage);
