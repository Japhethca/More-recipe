import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';

import slugify from '../common/slugify';
import DeleteButton from '../buttons/DeleteButton';
import UpdateButton from '../buttons/UpdateButton';
import ActionButtons from '../buttons/ActionButtons';
import handleDeleteRecipe from '../../actions/requestHandlers/handleDeleteRecipe';
import getRecipe from '../../actions/requestHandlers/getRecipe';
import UserDetail from '../user/UserDetail';
import { setFavorites, removeFavorite } from '../../actions/requestHandlers/handleUserFavorites';
import './recipe_card.scss';


const propTypes = {
  recipe: PropTypes.objectOf(PropTypes.any).isRequired,
  handleDeleteRecipe: PropTypes.func.isRequired,
  history: PropTypes.objectOf(PropTypes.any).isRequired,
  favorites: PropTypes.arrayOf(PropTypes.object).isRequired,
};

class Recipe extends Component {
  constructor(props) {
    super(props);
    this.state = {
      recipe: this.props.recipe,
    };
  }
  componentWillReceiveProps(nextProps) {
    if (this.props.recipe !== nextProps.recipe) {
      this.setState({ recipe: nextProps.recipe });
    }
  }
  render() {
    const { recipe } = this.state;
    const { favorites, history } = this.props;
    return (
      <div className="row" id="recipe-card">
        <div className="card col s12">
          <Link
            to={`/recipe/${slugify(recipe.name, '-')}-${recipe.id}`}
            className="card-image"
            href={`/recipe/${slugify(recipe.name, '-')}-${recipe.id}`}
          >
            <img src={recipe.image || 'http://res.cloudinary.com/dcmxbxzyj/image/upload/v1511526912/recipe-card-placeholder_ta9ikp.jpg'} alt={recipe.name} className="responsive-img recipe-image" />
            <h5 className="ellipses">{recipe.name}</h5>
          </Link>
          {recipe.User && <UserDetail user={recipe.User || {}} />}
          <hr />

          <div className="card-title">
            <ActionButtons
              recipe={recipe}
              favorites={favorites}
            />
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
})(Recipe));
