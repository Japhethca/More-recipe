import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import lodash from 'lodash';
import getRecipe from '../../actions/requestHandlers/getRecipe';
import {getFavorites} from '../../actions/requestHandlers/handleUserFavorites'
import '../../styles/sass/recipe_details.scss';
import Reviews from '../reviewComponents/ReviewsComponent';
import ActionButtons from '../buttons/ActionButtons';


 class RecipeDetails extends Component {
   constructor(props, {match}) {
     super(props)
     this.state = {
       recipe: {},
       hasErrored: false,
       hasNoReview: false
     }
   }
   
  componentDidMount(){
    this.props.getRecipe(this.props.match.params.id)
    .then(
      (res) => {
        this.setState({recipe: res.data});
      } 
    ).catch(
      err => this.setState({hasErrored: true})
    );
    this.props.getFavorites();
  }


  displayList(items){
    let listItems = lodash.split(items, ',');
    return listItems;
  }

  render() {
    let {name, ingredients, description, direction, image} = this.state.recipe;
    if (this.state.hasErrored){
      return (
        <div className='center'>
          <h4>404: RECIPE WAS NOT FOUND</h4>
          <p>Sorry, It seems like the recipe you are looking for does not exist.</p>
        </div>
        
      );
    }
    return (
      <div>
        <div className='card-title'>
          <h2 className='recipe-title'> {name} </h2>
          <hr/>
        </div>
        <div className='row'>
          <div className='card-image col s12 m6'>
            <img className=' card-image img-responsive col s12 m12 l12 center' 
              src={image ? image : require('../../../images/image-2.jpg')} 
              />
          </div>
          <div id='discription' className='col s12 m6'>
            <h4> Description </h4>
            <div className='description-content col s12 m12'>
              <p >{description} </p>
            </div>
            <div id='action-btns'>
                <ActionButtons recipe={this.state.recipe} reviews={this.props.reviews} favorites={this.props.favorites} />
            </div>
          </div>
          </div>
        <hr/>
          
        <div className='row'>     
          <div className='col s12 m6'>
            <h4> Ingredients </h4>
              <ol>
                {this.displayList(ingredients).map(item => (<li>{item}</li>))}
              </ol>
          </div>  
          <div className='col s12 m6'>
            <h4> Directions </h4>
              <ol>
                {this.displayList(direction).map(item => (<li>{item}</li>))}
              </ol>
          </div>     
        </div>
        <Reviews recipe={this.state.recipe} reviews={this.props.reviews}/>
      </div>
    )
  }
}

RecipeDetails.propTypes = {
  match: PropTypes.object.isRequired,
}
const mapStateToProps = (state, ownProps) => {
  return {
  reviews: state.reviews,
  favorites: state.favorites
  }
}


export default connect(mapStateToProps, {getRecipe, getFavorites})(RecipeDetails);