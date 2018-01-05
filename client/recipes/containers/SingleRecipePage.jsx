import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import _ from 'lodash';

import SingleRecipe from '../components/SingleRecipe';
import { getRecipe } from '../actions';

/**
 * @description SingleRecipe page
 * @class SingleRecipePage
 * @extends {Component}
 */
class SingleRecipePage extends Component {
  /**
   * @description Creates an instance of SingleRecipePage.
   * @param {any} props
   * @memberof SingleRecipePage
   */
  constructor(props) {
    super(props);
    this.state = {
      recipe: this.props.recipe,
      notFound: false
    };

    [this.id] = this.props.match.params.nameId.split('-').filter(val => !_.isNaN(parseInt(val, 10)));
  }

  /**
   * @memberof SingleRecipePage
   * @returns {undefined}
   */
  componentDidMount() {
    if (this.id === undefined || !this.props.recipe || this.state.notFound) {
      this.props.history.push('/recipes');
    } else {
      this.props.getRecipe(this.id);
    }
  }

  /**
   * @param {any} nextProps
   * @memberof SingleRecipePage
   * @returns {undefined}
   */
  componentWillReceiveProps(nextProps) {
    if (this.props.recipe !== nextProps.recipe) {
      this.setState({ recipe: nextProps.recipe });
    }
    if (nextProps.notFound === true) {
      this.props.history.push('/recipes');
    }
  }

  /**
   * @description renders single recipe page
   * @returns {reactElement} markup
   */
  render() {
    return (
      <div>
        {
          this.props.recipe &&
          <SingleRecipe
            recipe={this.state.recipe}
          />
        }
      </div>
    );
  }
}

SingleRecipePage.propTypes = {
  getRecipe: PropTypes.func.isRequired,
  match: PropTypes.objectOf(PropTypes.any).isRequired,
  history: PropTypes.objectOf(PropTypes.any).isRequired,
  recipe: PropTypes.objectOf(PropTypes.object).isRequired,
  notFound: PropTypes.bool
};

SingleRecipePage.defaultProps = {
  notFound: false
};

const mapStateToProps = state => ({
  recipe: state.recipeReducer.recipe,
  notFound: state.recipeReducer.NotFound
});

export default connect(mapStateToProps, { getRecipe })(SingleRecipePage);
