import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import MyRecipes from '../components/myRecipe/MyRecipes';
import handleDeleteRecipe from '../actions/requestHandlers/handleDeleteRecipe';
import getMyRecipes from '../actions/requestHandlers/getMyRecipes';
import '../components/myRecipe/my_recipes_page.scss';


const propTypes = {
  history: PropTypes.objectOf(PropTypes.any).isRequired,
  getMyRecipes: PropTypes.func.isRequired,
  handleDeleteRecipe: PropTypes.func.isRequired,
  userRecipes: PropTypes.objectOf(PropTypes.shape).isRequired,
  favorites: PropTypes.arrayOf(PropTypes.shape).isRequired,
  pagination: PropTypes.objectOf(PropTypes.number).isRequired
};
class MyRecipesPage extends Component {
  componentDidMount() {
    $('ul.tabs').tabs();
  }
  render() {
    return (
      <div>
        <div className="row">
          <div className="my-recipes">
            <div id="my_recipes">
              <MyRecipes
                showButtons
                history={this.props.history}
                getMyRecipes={this.props.getMyRecipes}
                handleDeleteRecipe={this.props.handleDeleteRecipe}
                userRecipes={this.props.userRecipes}
                favorites={this.props.favorites}
                pagination={this.props.pagination}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

MyRecipesPage.propTypes = propTypes;
const mapStateToProps = state => ({
  userRecipes: state,
  favorites: state.favorites,
  pagination: state.pagination
});

export default connect(mapStateToProps, { getMyRecipes, handleDeleteRecipe })(MyRecipesPage);
