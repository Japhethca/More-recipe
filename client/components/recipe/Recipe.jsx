import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import DeleteButton from '../buttons/DeleteButton';
import UpdateButton from '../buttons/UpdateButton';
import ActionButtons from '../buttons/ActionButtons';
import handleDeleteRecipe from '../../actions/requestHandlers/handleDeleteRecipe';
import getRecipe from '../../actions/requestHandlers/getRecipe';
import UserDetail from '../user/UserDetail';
import { setFavorites, removeFavorite } from '../../actions/requestHandlers/handleUserFavorites';
import './recipe_card.scss';


const propTypes = {
  recipe: PropTypes.object.isRequired,
  handleDeleteRecipe: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
  reviews: PropTypes.array.isRequired,
  favorites: PropTypes.array.isRequired,
  setFavorites: PropTypes.func.isRequired,
  removeFavorite: PropTypes.func.isRequired,
};

class Recipe extends Component {
  render() {
    const {
      recipe, auth, history, reviews, setFavorites, removeFavorite
    } = this.props;
    const { favorites } = this.props;
    return (
      <div className="row" id="recipe-card">
        <div className="card col s12">
          <Link to={`/recipe/${recipe.id}`} className="card-image" >
            <img src={recipe.image || require('../../../images/avatar.png')} className="responsive-img recipe-image" />
          </Link>
          <h5>{recipe.name}</h5>
          <UserDetail userId={recipe.userId} />

          <hr />

          <div className="card-title">
            <ActionButtons recipe={recipe} reviews={reviews} favorites={favorites} setFavorites={setFavorites} removeFavorite={removeFavorite} />
          </div>

          {this.props.showButtons &&
            <div className="card-action">
              <DeleteButton id={recipe.id} handleDeleteRecipe={this.props.handleDeleteRecipe} />
              <UpdateButton recipe={recipe} history={history} />
            </div>
          }

        </div>
      </div>
    );
  }
}

Recipe.propTypes = propTypes;

const mapStateToProps = state => ({
  auth: state.auth,
  reviews: state.reviews,
});

export default withRouter(connect(mapStateToProps, {
  handleDeleteRecipe,
  getRecipe,
  setFavorites,
  removeFavorite
})(Recipe));
