import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Recipe from './Recipe';
import handleDeleteRecipe from '../../actions/requestHandlers/handleDeleteRecipe';
import getMyRecipes from '../../actions/requestHandlers/getMyRecipes';
import {connect} from 'react-redux';

class MyRecipes extends Component {
  constructor(props) {
    super(props)
    this.state = {
      myrecipes: []
    };
  }
  componentWillMount(){
    this.props.getMyRecipes().then(
      (res) => {this.setState({ myrecipes: res.data.Recipes})},
      (err) => {}
    );
  }
  

  render() {
    let {myrecipes} = this.state;
    return (
      <div>
        <h3> My Recipes </h3>
        {myrecipes.map((recipe) => {
          return <Recipe key={recipe.id} handleDeleteRecipe={this.props.handleDeleteRecipe} recipe={recipe} />
        })}
      </div>
    )
  }
}

MyRecipes.propTypes = {
  getMyRecipes: PropTypes.func.isRequired,
  handleDeleteRecipe: PropTypes.func.isRequired
};

export default connect(null, {getMyRecipes,handleDeleteRecipe})(MyRecipes);