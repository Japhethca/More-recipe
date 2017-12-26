import React, { Component } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';

import './recipe_details.scss';
import Reviews from '../review/ReviewsComponent';
import ActionButtons from '../buttons/ActionButtons';
import UserDetail from '../user/UserDetail';

const propTypes = {
  match: PropTypes.objectOf(PropTypes.any).isRequired,
  favorites: PropTypes.arrayOf(PropTypes.object).isRequired,
  getRecipe: PropTypes.func.isRequired,
  recipe: PropTypes.objectOf(PropTypes.any).isRequired
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
      recipe: this.props.recipe,
    };
    [this.id] = this.props.match.params.nameId.split('-').filter(val => !_.isNaN(parseInt(val, 0)));
  }

  componentDidMount() {
    this.props.getRecipe(this.id);
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.recipe !== nextProps.recipe) {
      this.setState({ recipe: nextProps.recipe });
    }
  }

  displayList = (items) => {
    const listItems = _.split(items, ',');
    return listItems;
  }

  render() {
    const {
      name, ingredients, description, direction, image, author
    } = this.state.recipe;
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
            <span>{author && <UserDetail user={author} />} </span>

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
        <Reviews
          recipe={this.state.recipe}
        />
      </div>
    );
  }
}

RecipeDetails.propTypes = propTypes;


export default RecipeDetails;
