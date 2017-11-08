import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import handleRecipeReview from '../../actions/requestHandlers/handleRecipeReview';

class AddReview extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      content: '',
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }
  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }
  onSubmit(e) {
    e.preventDefault();
    this.props.handleRecipeReview(this.props.recipe.id, this.state);
    this.reviewForm.reset();
  }
                            
  render() {
    return (
      <div>
        <div >
          <form onSubmit={this.onSubmit} ref={node => this.reviewForm = node}>
            <div className="input-field" >
            <i className="material-icons prefix">mode_edit</i>
              <textarea type="text" name="content" onChange={this.onChange} id="reviewText" className="materialize-textarea" />
              <label htmlFor="reviewText">Write a Review</label>
            </div>
            <div className="input-field">
              <button type="submit" className="btn grey" >Post Review</button>
            </div>

          </form>
        </div>
      </div>
    );
  }
}

AddReview.propTypes = {
  recipe: PropTypes.object.isRequired,
  handleRecipeReview: PropTypes.func.isRequired
};

export default connect(null, { handleRecipeReview })(AddReview);
