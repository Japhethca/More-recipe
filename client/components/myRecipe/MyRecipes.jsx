import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Recipe from '../recipe/Recipe';
import handleDeleteRecipe from '../../actions/requestHandlers/handleDeleteRecipe';
import getMyRecipes from '../../actions/requestHandlers/getMyRecipes';
import './my_recipes_page.scss';


const propTypes = {
  getMyRecipes: PropTypes.func.isRequired,
  handleDeleteRecipe: PropTypes.func.isRequired,
  userRecipes: PropTypes.object.isRequired
};

class MyRecipes extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hasErrored: false
    };
  }

  componentDidMount() {
    this.props.getMyRecipes();
  }
  render() {
    const { userRecipes } = this.props.userRecipes;
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
              <li key={recipe.id} className="col s12 m4">
                <Recipe
                  handleDeleteRecipe={this.props.handleDeleteRecipe}
                  favorites={this.props.favorites}
                  recipe={recipe}
                  showButtons
                />
              </li>))
          }
        </ul>
      </div>
    );
  }
}

MyRecipes.propTypes = propTypes;

const mapStateToProps = state => ({
  userRecipes: state,
  favorites: state.favorites
});

export default connect(mapStateToProps, { getMyRecipes, handleDeleteRecipe })(MyRecipes);
