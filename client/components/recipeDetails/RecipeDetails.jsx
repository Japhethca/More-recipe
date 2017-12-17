import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import lodash from 'lodash';
import getRecipe from '../../actions/requestHandlers/getRecipe';
import './recipe_details.scss';
import Reviews from '../review/ReviewsComponent';
import ActionButtons from '../buttons/ActionButtons';
import UserDetail from '../user/UserDetail';
import { setFavorites, removeFavorite } from '../../actions/requestHandlers/handleUserFavorites';

const propTypes = {
  match: PropTypes.objectOf(PropTypes.any).isRequired,
  reviews: PropTypes.arrayOf(PropTypes.object).isRequired,
  favorites: PropTypes.arrayOf(PropTypes.object).isRequired,
  setFavorites: PropTypes.func.isRequired,
  removeFavorite: PropTypes.func.isRequired,
  getRecipe: PropTypes.func.isRequired,
  recipes: PropTypes.arrayOf(PropTypes.object).isRequired
};

class RecipeDetails extends Component {
  /**
   * Creates an instance of RecipeDetails.
   * @param {Object} props - props
   * @param {Object} { match }
   * @memberof RecipeDetails
   */
  constructor(props) {
    super(props);
    this.state = {
      recipe: {},
      favorites: [],
      reviews: [],
      hasErrored: false,
    };
    [this.urlID] = this.props.match.params.nameId.split('-').filter(val => !isNaN(parseInt(val, 0)));
  }

  componentDidMount() {
    this.props.getRecipe(this.urlID)
      .then((res) => {
        this.setState({ recipe: res.data.recipe });
      }).catch((err) => {
        if (err.response.status === 404) {
          this.setState({ hasErrored: true });
        }
      });
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.recipes !== nextProps.recipes) {
      this.props.getRecipe(this.urlID)
        .then((res) => {
          this.setState({ recipe: res.data.recipe });
        }).catch(err => this.setState({ hasErrored: true }));
    }
  }

  displayList = (items) => {
    const listItems = lodash.split(items, ',');
    return listItems;
  }

  render() {
    const {
      name, ingredients, description, direction, image, User
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
        <div >
          <h4 className="recipe-title"> {name} </h4>
          <hr className="h-line" />
        </div>
        <div className="row" >
          <div className="col s12 m6">
            <img
              className="responsive-img center"
              src={image || 'http://res.cloudinary.com/dcmxbxzyj/image/upload/v1511526912/recipe-card-placeholder_ta9ikp.jpg'}
              alt=""
            />
            <p className="description-text" >{description} </p>
            <div id="action-btns">
              {this.state.recipe &&
              <ActionButtons
                recipe={this.state.recipe}
                favorites={this.props.favorites}
              />
             }
            </div>
            <span>{User && <UserDetail user={User} />} </span>

          </div>
          <div className="col s12 m6">
            <div>
              <h4 className="heading"> Ingredients </h4>
              <ol>
                {this.displayList(ingredients).map(item => (<li key={item}>{item}</li>))}
              </ol>
            </div>
            <div >
              <h4 className="heading"> Directions </h4>
              <ol>
                {this.displayList(direction).map(item => (<li key={item}>{item}</li>))}
              </ol>
            </div>
          </div>
        </div>
        <hr className="h-line" />
        <Reviews recipe={this.state.recipe} />
      </div>
    );
  }
}

RecipeDetails.propTypes = propTypes;


export default connect(null, { getRecipe, setFavorites, removeFavorite })(RecipeDetails);
