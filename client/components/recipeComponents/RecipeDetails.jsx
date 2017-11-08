import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import lodash from 'lodash';
import getRecipe from '../../actions/requestHandlers/getRecipe';
import '../../styles/sass/recipe_details.scss';
import Reviews from '../reviewComponents/ReviewsComponent';
import ActionButtons from '../buttons/ActionButtons';
import UserDetail from '../userComponent/UserDetail';
import { setFavorites, removeFavorite } from '../../actions/requestHandlers/handleUserFavorites';


class RecipeDetails extends Component {
  constructor(props, { match }) {
    super(props);
    this.state = {
      recipe: {},
      favorites: [],
      reviews: [],
      hasErrored: false,
      hasNoReview: false
    };

    this.displayList = this.displayList.bind(this);
  }

  componentDidMount() {
    this.props.getRecipe(this.props.match.params.id)
      .then((res) => {
        this.setState({ recipe: res.data });
      }).catch(err => this.setState({ hasErrored: true }));
    this.setState({ favorites: this.props.favorites });
  }


  componentWillReceiveProps(nextProps) {
    if (this.props.recipes !== nextProps.recipes) {
      const recipe = nextProps.recipes.filter(recipe => recipe.id === this.state.recipe.id);
      this.setState({ recipe: recipe[0], favorites: nextProps.favorites, reviews: nextProps.reviews });
    }
  }

  displayList(items) {
    const listItems = lodash.split(items, ',');
    return listItems;
  }

  render() {
    const {
      name, ingredients, description, direction, image, updatedAt, userId
    } = this.state.recipe;
    if (this.state.hasErrored) {
      return (
        <div className="recipe-not-found">
          <h4>404: RECIPE DOES NOT EXIST</h4>
          <p>Sorry, It seems like the recipe you are looking for does not exist.</p>
        </div>
      );
    }
    return (
      <div className="recipe-details">
        <div>
          <h2> {name} </h2>
          <hr />
        </div>
        <div className="center" >
          <img
            className="responsive-img center"
            src={image || require('../../../images/image-2.jpg')}
          />
        </div>

        <div className="col s12 m6 offset-m3 description">
          <h4> Description </h4>
          <div className="description-content col s12 m12">
            <p >{description} </p>
          </div>
          <div id="action-btns">
            {this.state.recipe &&
            <ActionButtons
              recipe={this.state.recipe}
              reviews={this.props.reviews}
              setFavorites={this.props.setFavorites}
              removeFavorite={this.props.removeFavorite}
            />
             }
          </div>
        </div>
        <span>Last Modified on {updatedAt} {userId && <UserDetail userId={userId} />} </span>
        <hr />

        <div className="row">
          <div className="col s12 m6">
            <h4> Ingredients </h4>
            <ol>
              {this.displayList(ingredients).map(item => (<li >{item}</li>))}
            </ol>
          </div>
          <div className="col s12 m6">
            <h4> Directions </h4>
            <ol>
              {this.displayList(direction).map(item => (<li>{item}</li>))}
            </ol>
          </div>
        </div>
        <Reviews recipe={this.state.recipe} reviews={this.props.reviews} />
      </div>
    );
  }
}

RecipeDetails.propTypes = {
  match: PropTypes.object.isRequired,
};
const mapStateToProps = state => ({
  favorites: state.favorites,
  reviews: state.reviews,
  recipes: state.recipes,
});


export default connect(mapStateToProps, { getRecipe, setFavorites, removeFavorite })(RecipeDetails);
