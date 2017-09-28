import React, { Component } from 'react';
import NavigationBar from '../components/NavigationBar';
import TopRecipes from '../components/recipeComponents/TopRecipe';


class Home extends Component {
  render() {
    return (
      <div>
        <NavigationBar />
        <TopRecipes/>
      </div>
    )
  }
}

export default Home;