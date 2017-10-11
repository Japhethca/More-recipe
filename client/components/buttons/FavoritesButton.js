import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classname from 'classnames';
import {connect} from 'react-redux';

import {setFavorites, removeFavorite} from '../../actions/requestHandlers/handleUserFavorites';


class FavoritesButton extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isFavorite: false
    }
    this.onClick = this.onClick.bind(this);
    this.toggleFavorite = this.toggleFavorite.bind(this);
    this.isInFavorites = this.isInFavorites.bind(this);
  }
  componentDidMount(){
    this.isInFavorites();
  }
  isInFavorites(){
    // console.log(this.props.favorites);
    let checkFavorite = this.props.favorites.filter((favorite) => favorite.recipeId === this.props.recipe.id);
    // console.log(checkFavorite);
    if (checkFavorite.length > 0){
      this.setState({isFavorite: true});
      return true;
    }
  }
  toggleFavorite(){
    if (this.state.isFavorite){
      this.setState({isFavorite: false} );
    } else {
      this.setState({isFavorite: true});
    }
  }
  onClick(e){
    e.preventDefault();
    this.toggleFavorite();
    if (!this.state.isFavorite){
      this.props.setFavorites(this.props.recipe)
    }else{
      this.props.removeFavorite(this.props.recipe.id)
    }
  }


  render() {
    const {favorites, recipe} = this.props;
    // const isFavorite = favorites.filter(favorite => favorite.recipeId === recipe.id).length > 0 ? true : false;
    return (
      <div className='action-btns'>
        <span onClick={this.onClick} className={classname('btn', {'red': this.state.isFavorite,'brown darken': !this.state.isFavorite})} >
          <i className={classname('material-icons', )}>favorite</i>
        </span >
      </div>
    )
  }
}

FavoritesButton.propTypes = {
  recipe: PropTypes.object.isRequired,
  favorites: PropTypes.array.isRequired,
  setFavorites: PropTypes.func.isRequired,
  removeFavorite: PropTypes.func.isRequired
}


export default connect(null, {setFavorites, removeFavorite})(FavoritesButton);