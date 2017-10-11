import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import handleRecipeReview from '../../actions/requestHandlers/handleRecipeReview';

class AddReview extends Component {
  constructor(props) {
    super(props)
    this.state = {
      title: '',
      content: '',
    }
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
   }
  onChange(e){
    this.setState({[e.target.name]: e.target.value});
  }
  onSubmit(e){
    e.preventDefault();
    this.props.handleRecipeReview(this.props.recipe.id, this.state);
    this.reviewForm.reset();
  }

  render() {
    return (
      <div>
        <div >
          <form onSubmit={this.onSubmit} ref={(node) => this.reviewForm = node }>
            <div className='input-field'>
              <input type='text' name='title' onChange={this.onChange} />
              <label>Title</label>
            </div>
            <div className='input-field' >
              <input type='text' name='content' onChange={this.onChange} />
              <label htmlFor='content'>Review</label>
            </div>
            <div>
              <button type='submit' className='btn blue' >Post Review</button>
            </div>
            
          </form>
        </div>
      </div>
    )
  }
}

AddReview.propTypes = {
  recipe: PropTypes.object.isRequired,
  handleRecipeReview: PropTypes.func.isRequired
}

export default connect(null, {handleRecipeReview})(AddReview);