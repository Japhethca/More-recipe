import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import NavigationBar from '../components/navigation/NavigationBar';
import Footer from '../components/navigation/Footer';
import AddRecipe from '../components/myRecipe/AddRecipe';
import MyRecipes from '../components/myRecipe/MyRecipes';
import '../components/myRecipe/my_recipes_page.scss';


const propTypes = {
  history: PropTypes.object.isRequired
};
class MyRecipesPage extends Component {
  componentDidMount() {
    $('ul.tabs').tabs();
  }
  render() {
    return (
      <div>
        <NavigationBar />
        <div className="container row ">
          <div className="my-recipes">
            <ul className="tabs">
              <li className="tab"> <a href="#my_recipes">My Recipes </a></li>
              <li className="tab" ><a href="#new_recipe">Add New</a></li>
            </ul>
            <div id="my_recipes">
              <MyRecipes showButtons />
            </div>
            <div className="col s12 m8 offset-m2" id="new_recipe" >
              <AddRecipe history={this.props.history} addFlashMessage={this.props.addFlashMessage} />
            </div>
          </div>

        </div>
        <Footer />
      </div>
    );
  }
}

MyRecipesPage.propTypes = propTypes;

export default connect(null, { })(MyRecipesPage);
