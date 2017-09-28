import React, { Component } from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import Recipe from './Recipe';
import getAllRecipes from '../../actions/requestHandlers/getAllRecipes';



class TopRecipes extends Component {
  constructor(props) {
    super(props)
    this.state = {
      recipes: []
    }
  }
  
  componentDidMount() {
    this.props.getAllRecipes().then(
      (res) => {console.log(res.data)},
      (err) => {console.log(res.dadta)}
    )
  }
  
  render() {
    const allrrecipes = this.state.recipes;
    if (allrrecipes.length > 0){
      allrrecipes.map((recipe) => {
        <Recipe recipe={recipe} />
      })
    }
    return (
      <div className='container'>
        <Recipe />
      </div>
    )
  }
}


TopRecipes.propTypes = {
  getAllRecipes: PropTypes.func.isRequired
}
export default connect(null, {getAllRecipes})(TopRecipes);
