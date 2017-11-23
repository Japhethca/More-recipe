import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Recipe from '../recipe/Recipe';

const propTypes = {
  favorites: PropTypes.arrayOf(PropTypes.object).isRequired,
};

class Favorites extends Component {
  constructor(props) {
    super(props);
    this.state = {
      favorites: this.props.favorites
    };
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.favorites !== this.props.favorites) {
      this.setState({ favorites: nextProps.favorites });
    }
  }
  render() {
    const { favorites } = this.state;
    return (
      <ul className="row">
        {favorites.map(favorite => (
          <li key={favorite.id} className="col s12 m6 l4" >
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
