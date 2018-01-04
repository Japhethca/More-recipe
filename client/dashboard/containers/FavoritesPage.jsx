import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { Recipes } from '../../recipes';
import { handleGetFavorites } from '../actions';
import Pagination from '../../common/Pagination';


class FavoritesPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      favorites: this.props.favorites
    };
  }

  componentDidMount() {
    this.props.handleGetFavorites();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.favorites !== this.props.favorites) {
      this.setState({ favorites: nextProps.favorites });
    }
  }

  handlePagination = (page) => {
    this.props.handleGetFavorites(page.selected + 1);
  }

  render() {
    return (
      <div>
        <Recipes
          recipes={this.state.favorites}
          showActionBtns={false}
          showRemoveFavorite
          className="col s12 m6 l4"
          noItemText="You Have No favorite Recipe!"
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
