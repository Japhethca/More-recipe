import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Recipe from '../recipeComponents/Recipe';

class Favorites extends Component {
  render() {
    const { favorites, recipes } = this.props;
    console.log(favorites);
    return (
       <div className="row">
         {favorites.map(favorite => (
           <div className="col s12 m4" >
             <Recipe key={favorite.id} recipe={favorite} favorites={this.props.favorites} />
           </div>
         ))}
       </div>
    );
  }
}

Favorites.propTypes = {
  favorites: PropTypes.array.isRequired,
};

export default Favorites;
