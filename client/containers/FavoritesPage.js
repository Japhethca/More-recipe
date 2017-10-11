import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import { getFavorites, setFavorites, removeFavorite } from '../actions/requestHandlers/handleUserFavorites';
import Favorites from '../components/recipeComponents/Favorites';
import NavigationBar from '../components/NavigationBar';
import Footer from '../components/Footer';


class FavoritesPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hasErrored: false
    }

  }
  componentDidMount() {
    this.props.getFavorites(this.props.user.id);
  }
  render() {
    const { favorites, user } = this.props;
    console.log(favorites);
    console.log(user);
    /* if (this.state.hasErrored){
      return (
        <div>
          <NavigationBar />
          <div className='container'>
            <h4>My Favorite Recipes</h4>
            <p>It seems like you have not added recipe to your favorite. Try adding one to show it here.</p>
          </div>
          
        </div>
      );
    } */
    return (
      <div>
        
        <div>
          <Favorites user={user} favorites={favorites}/>
        </div>
        <Footer />
      </div>
    )
  }
}

FavoritesPage.propTypes = {    
  favorites: PropTypes.array.isRequired,    
  user: PropTypes.object.isRequired,
  getFavorites: PropTypes.func.isRequired,       
};    
const mapStateToProps = (state) => {
  return {
    favorites: state.favorites,
    user: state.auth.user
  };
}
 
export default connect(mapStateToProps, {getFavorites})(FavoritesPage);