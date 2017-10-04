import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import getRecipe from '../../actions/requestHandlers/getRecipe';
import '../../styles/sass/recipe_details.scss';


 class RecipeDetails extends Component {
   constructor(props, {match}) {
     super(props)
     this.state = {
       recipe: {}
     }
   }
   
  componentDidMount(){
    this.props.getRecipe(this.props.match.params.id).then(
      (res) => {this.setState({recipe: res.data})},
      (err) => {}
    )
  }

  render() {
    let {name, ingredients, description, direction, image} = this.state.recipe;
    
  
    return (
      <div>
        <div className='z-depth-4'>
          <div className='card-image'>
            <img className=' card-image img-responsive col s12 m12 l12 center' src={image ? image : require('../../../images/image.jpg')} />
          </div>
          <div className='card-title'>
            <h3> {name} </h3>
        </div>
        </div>
        
          <div id='discription' className=' '>
            <h4> Description </h4>
            <p className='col s12 m12'>{description} </p>
          </div>
        <div className='row'>     
          <div className='col s12 m6'>
            <h4> Ingredients </h4>
             {ingredients}
          </div>  
          <div className='col s12 m6'>
            <h4> Directions </h4>
            <p> {direction} </p>
          </div>     
        </div>
      </div>
    )
  }
}


RecipeDetails.propTypes = {
  getRecipe: PropTypes.func.isRequired,
  match: PropTypes.object.isRequired
}

export default connect(null, {getRecipe})(RecipeDetails);