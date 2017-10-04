import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';
import '../../styles/sass/recipe_card.scss';


class ReviewButton extends Component {
  constructor(props) {
    super(props);
    this.state = {
      reviews: []
    }

    this.onClick = this.onClick.bind(this);
  }
  componentDidMount(){
    this.props.getReviews(this.props.recipe.id).then(
      (res) => {this.setState({reviews: res.data.Reviews})},
      (res) => {}
    )
  }
  onClick(e){
    this.props.history.push(`/recipe/${this.props.recipe.id}`)
  }
  render() {
    return (
      <div className='meta-btn'>
        <span onClick={this.onClick} className='btn brown darken-2' >
          Reviews<span id="reivews">({this.state.reviews.length})</span> 
        </span >
      </div>
    )
  }
}

ReviewButton.propTypes = {
  recipe: PropTypes.object.isRequired,
  getReviews: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired
}

export default ReviewButton