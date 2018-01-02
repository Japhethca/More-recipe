import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import _ from 'lodash';

import SingleRecipe from '../components/SingleRecipe';
import { getRecipe } from '../actions';


class SingleRecipePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      recipe: this.props.recipe,
      notFound: false
    };

    [this.id] = this.props.match.params.nameId.split('-').filter(val => !_.isNaN(parseInt(val, 10)));
  }

  componentDidMount() {
    if (this.id === undefined || !this.props.recipe || this.state.notFound) {
      this.props.history.push('/');
    }
    this.props.getRecipe(this.id);
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.recipe !== nextProps.recipe) {
      this.setState({ recipe: nextProps.recipe });
    }
    if (nextProps.notFound === true) {
      this.props.history.push('/');
    }
  }


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
