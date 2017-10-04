import React, { Component } from 'react';
import PropTypes from 'prop-types';
import NavigationBar from '../components/NavigationBar';
import TopRecipes from '../components/recipeComponents/TopRecipe';


class Home extends Component {
  render() {
    return (
      <div>
        <NavigationBar />
        <TopRecipes history={this.props.history} />
      </div>
    )
  }
}

Home.propTypes = {
  history: PropTypes.object.isRequired
}

export default Home;