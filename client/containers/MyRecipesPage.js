import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import NavigationBar from '../components/NavigationBar';
import AddRecipe from '../components/recipeComponents/AddRecipe';
import FlashMessageList from '../components/flash/FlashMessageList';
import {addFlashMessage} from '../actions/flashMessage';
import MyRecipes from '../components/recipeComponents/MyRecipes';


class MyRecipesPage extends Component {

  render() {
    return (
      <div>
        <NavigationBar />
        <div className='container'>
          <FlashMessageList />
          <MyRecipes /> 
          <AddRecipe history={this.props.history} addFlashMessage={this.props.addFlashMessage} />
        </div>
      </div>
    );
  }
}
MyRecipesPage.PropTypes = {
  addFlashMessage: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired
}

export default connect(null, {addFlashMessage})(MyRecipesPage);