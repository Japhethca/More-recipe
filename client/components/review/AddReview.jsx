import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import handleRecipeReview from '../../actions/requestHandlers/handleRecipeReview';


const propTypes = {
  recipe: PropTypes.objectOf(PropTypes.any).isRequired,
  handleRecipeReview: PropTypes.func.isRequired
};

class AddReview extends Component {
  constructor(props) {
    super(props);
    this.state = {
      content: '',
    };
  }
  onChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  }
  onSubmit = (event) => {
    event.preventDefault();
    this.props.handleRecipeReview(this.props.recipe.id, this.state);
    this.setState({ content: '' });
  }

  render() {
    return (
      <div>
        <div >
          <form onSubmit={this.onSubmit} ref={node => this.reviewForm = node}>
            <div className="input-field" >
              <i className="material-icons prefix">mode_edit</i>
              <textarea
                type="text"
                name="content"
                onChange={this.onChange}
                id="reviewText"
                value={this.state.content}
                className="materialize-textarea"
              />
              <label htmlFor="reviewText">Write a Review</label>
            </div>
            <div className="input-field">
              <button type="submit" className="btn brown" >Post Review</button>
            </div>

          </form>
        </div>
      </div>
    );
  }
}

AddReview.propTypes = propTypes;

export default connect(null, { handleRecipeReview })(AddReview);
