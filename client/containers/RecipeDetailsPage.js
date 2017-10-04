import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {withRouter} from 'react-router-dom';
import NavigationBar from '../components/NavigationBar';
import RecipeDetails from '../components/recipeComponents/RecipeDetails';

 class RecipeDetailsPage extends Component {
  render() {
    return (
      <div>
        <NavigationBar />
        <div className='container'>
          <RecipeDetails match={this.props.match} />
        </div>
      </div>
    )
  }
}
RecipeDetailsPage.propTypes = {
  match: PropTypes.object.isRequired
}

export default withRouter(RecipeDetailsPage);
