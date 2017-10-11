import React, { Component } from 'react';
import PropTypes from 'prop-types';
import '../../styles/sass/recipe_card.scss';


class ReviewButton extends Component {
  onClick(e){
    
  }
  render() {
    const {recipe} = this.props;
    const reviews = this.props.reviews.filter((review) => recipe.id === review.recipeId);
    return (
      <div className='action-btns'>
        <span onClick={this.onClick.bind(this)} className='btn brown darken' >
          <i className='material-icons'>people</i><span id="reivews"> &nbsp;{reviews.length || 0 }</span> 
        </span >
      </div>
    )
  }
}

ReviewButton.propTypes = {
  recipe: PropTypes.object.isRequired,
  reviews: PropTypes.array.isRequired
}

export default ReviewButton;