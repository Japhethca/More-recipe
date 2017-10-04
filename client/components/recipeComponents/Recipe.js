import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {Link, withRouter} from 'react-router-dom';
import DeleteButton from '../buttons/DeleteButton';
import UpdateButton from '../buttons/UpdateButton';
import handleDeleteRecipe from '../../actions/requestHandlers/handleDeleteRecipe';
import getReviews from '../../actions/requestHandlers/getReviews';
import ReviewButton from '../buttons/ReviewButton';
import DownvoteButton from '../buttons/DownvoteButton';
import getRecipe from '../../actions/requestHandlers/getRecipe';
require('../../styles/sass/recipe_card.scss');


class Recipe extends Component {
  constructor(props) {
    super(props);
    this.state = {
      recipe: this.props.recipe
    }
    this.setNewState = this.setNewState.bind(this);
  }  
  setNewState(){
    this.props.getRecipe(this.props.recipe.id).then(
      (res) => {this.setState({recipe: res.data})},
      (err) => {}
    )
  }
  render() {
    const {recipe, auth, history} = this.props;
    return (
      <div className='row' id='recipe-card'>
        <div className="card col s12">
          <div className="card-image">
            <Link to={`/recipe/${recipe.id}`}   > 
              <img src={require('../../../images/image.jpg')}  alt='' className='img'/>            
            </Link>
          </div>
          <div className="card-content">
            <h5>{recipe.name}</h5>
          </div>
          <div className='card-title'>
            <ReviewButton history={history} getReviews={this.props.getReviews} recipe={recipe} />
            <DownvoteButton setNewState={this.setNewState} recipe={recipe} />
          </div>
          <div>            
              {recipe.userId === auth.user.id  
                ? (
                  <div className="card-action">
                  <DeleteButton id={recipe.id} handleDeleteRecipe={this.props.handleDeleteRecipe} />
                  <UpdateButton recipe={recipe} history={history}/>
                  </div>) : <p/>}
          </div>
        </div>
      </div>
    )
  }
}
Recipe.propTypes = {
  recipe: PropTypes.object,
  handleDeleteRecipe: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
  getReviews: PropTypes.func.isRequired,
  getRecipe: PropTypes.func.isRequired
};

function mapStateToProps(state){
  return {
    auth: state.auth
  };
} 

export default withRouter(connect(mapStateToProps,{handleDeleteRecipe, getReviews, getRecipe})(Recipe));
