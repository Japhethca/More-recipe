 import React, { Component } from 'react';
 import PropTypes from 'prop-types';
 
 class Favorites extends Component {
   render() {
     const {favorites} = this.props;
     console.log(favorites);
     return (
       <div>
         {favorites.map(recipe => (
            <div>
              <Recipe key={recipe.id} recipe={recipe} />
            </div>
         ))}
       </div>
     )
   }
 }
 
 Favorites.propTypes = {
  favorites: PropTypes.array.isRequired,
  user: PropTypes.object.isRequired
 };
 
 export default Favorites;