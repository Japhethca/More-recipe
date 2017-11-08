import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Recipe from './Recipe';
import handleDeleteRecipe from '../../actions/requestHandlers/handleDeleteRecipe';
import getMyRecipes from '../../actions/requestHandlers/getMyRecipes';
import '../../styles/sass/my_recipes_page.scss';

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
    console.log(this.props.favorites);
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
          {userRecipes.map(recipe => <li className="col s12 m4"> <Recipe key={recipe.id} handleDeleteRecipe={this.props.handleDeleteRecipe} favorites={this.props.favorites} recipe={recipe} showButtons /> </li>)}
        </ul>
      </div>
    );
  }
}

MyRecipes.propTypes = {
  getMyRecipes: PropTypes.func.isRequired,
  handleDeleteRecipe: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  userRecipes: state,
  favorites: state.favorites
});

export default connect(mapStateToProps, { getMyRecipes, handleDeleteRecipe })(MyRecipes);
