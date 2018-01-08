import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import ListReviews from '../components/ListReviews';
import AddReview from '../components/AddReview';
import handleRecipeReview from '../actions';
import Loader from '../../common/Loader';
import '../reviews.scss';


const propTypes = {
  recipe: PropTypes.objectOf(PropTypes.any).isRequired,
  handleRecipeReview: PropTypes.func.isRequired,
  loader: PropTypes.objectOf(PropTypes.bool).isRequired
};

/**
 * @class Reviews
 * @extends {Component}
 */
class Reviews extends Component {
  /**
   * @description Creates an instance of Reviews.
   * @param {any} props
   * @memberof Reviews
   */
  constructor(props) {
    super(props);
    this.state = {
      content: '',
    };
  }

  /**
   * @description handle input change
   * @memberof Reviews
   * @param {SyntheticEvent} event
   * @returns {undefined}
   */
  onChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  }

  /**
   * @description handle review submit
   * @memberof Reviews
   * @param {SyntheticEvent} event - event
   * @returns {undefined}
   */
  onSubmit = (event) => {
    event.preventDefault();
    this.props.handleRecipeReview(this.props.recipe.id, this.state);
    this.setState({ content: '' });
  }

  /**
   * @description renders reviews
   * @return {reactElement} markup
   */
  render() {
    return (
      <div className="reviews-page" >
        <ListReviews reviews={this.props.recipe.Reviews} />
        <AddReview
          onChange={this.onChange}
          onSubmit={this.onSubmit}
          content={this.state.content}
        />
      </div>
    );
  }
}

Reviews.propTypes = propTypes;

const mapStateToProps = state => ({
  loader: state.loader
});


export default connect(mapStateToProps, { handleRecipeReview })(Reviews);
