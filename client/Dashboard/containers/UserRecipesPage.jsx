import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Recipes from '../../Recipes';
import { handleGetUserRecipes } from '../actions';
import Loader from '../../common/Loader';

/**
 * @description User recipes page component
 * @class UserRecipesPage
 * @extends {Component}
 */
export class UserRecipesPage extends Component {
  /**
   * Creates an instance of UserRecipesPage.
   * @param {any} props
   * @memberof UserRecipesPage
   */
  constructor(props) {
    super(props);
    this.state = {
      userRecipes: this.props.userRecipes.payload,
    };
  }

  /**
   * @description makes an API call for user recipes on component mount
   * @memberof UserRecipesPage
   * @returns {none} - none
   */
  componentDidMount() {
    this.props.handleGetUserRecipes();
  }

  /**
   *
   * @description changes recipes state on recieve props
   * @param {object} nextProps
   * @memberof UserRecipesPage
   * @return {none} - none
   */
  componentWillReceiveProps(nextProps) {
    if (nextProps.userRecipes !== this.props.userRecipes) {
      this.setState({ userRecipes: nextProps.userRecipes.payload });
    }
  }

  /**
   * @description renders user recipes
   * @returns {ReactElement} markup
   */
  render() {
    const { isFetching } = this.props.userRecipes;
    return (
      <div>
        {
          isFetching ? <Loader isFetching />
        :
          <Recipes
            showActionBtns={false}
            showModifyButtons
            className="col s12 m6 l4"
            recipes={this.state.userRecipes}
            noItemText="No recipes! Create a recipe"
          />
        }
      </div>
    );
  }
}

UserRecipesPage.propTypes = {
  userRecipes: PropTypes.objectOf(PropTypes.shape).isRequired,
  handleGetUserRecipes: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  userRecipes: state.recipeReducer.userRecipes,
});

export default connect(mapStateToProps, { handleGetUserRecipes })(UserRecipesPage);
