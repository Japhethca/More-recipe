import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {Link, withRouter} from 'react-router-dom';
import DeleteButton from '../buttons/DeleteButton';
import UpdateButton from '../buttons/UpdateButton';
import ActionButtons from '../buttons/ActionButtons';
import handleDeleteRecipe from '../../actions/requestHandlers/handleDeleteRecipe';
import getRecipe from '../../actions/requestHandlers/getRecipe';
import UserDetail from '../userComponent/UserDetail';
import {getFavorites, setFavorites, removeFavorite} from '../../actions/requestHandlers/handleUserFavorites';
require('../../styles/sass/recipe_card.scss');


class Recipe extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hasNoReview: false
    }
  } 
  render() {
    const {recipe, auth, history, reviews, setFavorites, removeFavorite} = this.props;
    const favorites = this.props.favorites;/* .filter((favorite) => favorite.userId == this.props.auth.user.id); */
    return (
      <div className='row' id='recipe-card'>
        <div className="card col s12">
          <div className="card-image">
            <Link to={`/recipe/${recipe.id}`}   > 
              <img src={require('../../../images/image.jpg')}  alt='Recipe Image' className='img image'/>            
            </Link>
          </div>
          <div className="card-content center">
            <h5>{recipe.name}</h5>
          </div>
          <div>
            <UserDetail userId={recipe.userId} />
          </div>
          <div className='card-title'>
            <ActionButtons recipe={recipe} reviews={reviews} favorites={favorites} setFavorites={setFavorites} removeFavorite={removeFavorite} />
          </div>
          <div>            
              {this.props.showButtons &&
                  <div className="card-action">
                    <DeleteButton id={recipe.id} handleDeleteRecipe={this.props.handleDeleteRecipe} />
                    <UpdateButton recipe={recipe} history={history}/>
                  </div> }
          </div>
          
        </div>
      </div>
    )
  }
}
Recipe.propTypes = {
  recipe: PropTypes.object.isRequired,
  handleDeleteRecipe: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
  reviews: PropTypes.array.isRequired,
  favorites: PropTypes.array.isRequired,
  setFavorites: PropTypes.func.isRequired,
  removeFavorite: PropTypes.func.isRequired,
};

function mapStateToProps(state){
  return {
    auth: state.auth,
    reviews: state.reviews,
    favorites: state.favorites
  };
} 

export default withRouter(connect(mapStateToProps,{
  handleDeleteRecipe, 
  getRecipe,
  setFavorites,
  removeFavorite
  })(Recipe));
