import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import NavigationBar from '../components/NavigationBar';
import Footer from '../components/Footer';
import AddRecipe from '../components/recipeComponents/AddRecipe';
import {addFlashMessage} from '../actions/flashMessage';
import getReviews from '../actions/requestHandlers/getReviews';
import MyRecipes from '../components/recipeComponents/MyRecipes';


class MyRecipesPage extends Component {
  componentDidMount(){
    this.props.getReviews();
  }
  render() {
    return (
      <div>
        <NavigationBar />
        <div className='container row '>
        <div className='my-recipes-section'>
          <h3> My Recipes </h3>
        </div>
          <div className='col s12 m6'>
            <MyRecipes showButtons/> 
          </div>
          <div className='col s12 m6' >
            <AddRecipe history={this.props.history} addFlashMessage={this.props.addFlashMessage} />
          </div>
        </div>
        <Footer/>
      </div>
    );
  }
}
MyRecipesPage.PropTypes = {
  addFlashMessage: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired
}

export default connect(null, {addFlashMessage,getReviews})(MyRecipesPage);