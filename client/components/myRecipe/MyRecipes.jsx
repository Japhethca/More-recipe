import React, { Component } from 'react';
import PropTypes from 'prop-types';
import qs from 'qs';

import Recipe from '../recipe/Recipe';
import Pagination from '../common/Pagination';


const propTypes = {
  getMyRecipes: PropTypes.func.isRequired,
  handleDeleteRecipe: PropTypes.func.isRequired,
  userRecipes: PropTypes.objectOf(PropTypes.shape).isRequired,
  favorites: PropTypes.arrayOf(PropTypes.shape).isRequired,
  history: PropTypes.objectOf(PropTypes.any).isRequired,
};

class MyRecipes extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hasErrored: false,
      query: this.props.history.location.search,
      myRecipes: this.props.userRecipes || []
    };
  }

  componentDidMount() {
    const { page } = qs.parse(this.state.query, { ignoreQueryPrefix: true });
    this.props.getMyRecipes(parseInt(page, 10));
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.userRecipes.userRecipes !== this.props.userRecipes.userRecipes) {
      this.setState({ myRecipes: nextProps.userRecipes });
    }
  }

  render() {
    const { userRecipes } = this.state.myRecipes;
    if (this.state.hasErrored) {
      return (
        <div>
          <h5>User has not added any recipe, try adding one.</h5>
        </div>
      );
    }
    return (
      <div>
        <ul className="row">
          {userRecipes.map(recipe =>
            (
              <li key={recipe.id} className="col s12 m6 l4">
                <Recipe
                  handleDeleteRecipe={this.props.handleDeleteRecipe}
                  favorites={this.props.favorites}
                  recipe={recipe}
                  showButtons
                />
              </li>))
          }
        </ul>
        <Pagination baseURL="/my-recipes" />
      </div>
    );
  }
}

MyRecipes.propTypes = propTypes;

export default MyRecipes;
