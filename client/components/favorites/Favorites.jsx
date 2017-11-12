import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Recipe from '../recipe/Recipe';

const propTypes = {
  favorites: PropTypes.array.isRequired,
};

class Favorites extends Component {
  render() {
    const { favorites } = this.props;
    return (
      <ul className="row">
        {favorites.map(favorite => (
          <li key={favorite.id} className="col s12 m4" >
            <Recipe
              recipe={favorite}
              favorites={this.props.favorites}
            />
          </li>
         ))}
      </ul>
    );
  }
}

Favorites.propTypes = propTypes;

export default Favorites;
