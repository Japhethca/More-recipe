import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { Recipes } from '../../recipes';
import { handleGetUserRecipes } from '../actions';
import Pagination from '../../common/Pagination';

/**
 * @description User recipes page component
 * @class UserRecipesPage
 * @extends {Component}
 */
class UserRecipesPage extends Component {
  /**
   * Creates an instance of UserRecipesPage.
   * @param {any} props
   * @memberof UserRecipesPage
   */
  constructor(props) {
    super(props);
    this.state = {
      userRecipes: this.props.userRecipes
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
      this.setState({ userRecipes: nextProps.userRecipes });
    }
  }

  /**
   * @description handles pagination
   * @memberof UserRecipesPage
   * @param {object} page
   * @returns {none} -none
   */
  handlePagination = (page) => {
    this.props.handleGetUserRecipes(page.selected + 1);
  }

  /**
   * @description renders user recipes
   * @returns {ReactElement} markup
   */
  render() {
    return (
      <div>
        <Recipes
          showActionBtns={false}
          showModifyButtons
          className="col s12 m6 l4"
          recipes={this.state.userRecipes}
          noItemText="No recipes! Create a recipe"
        />
        { this.state.userRecipes.length > 0 &&
        <Pagination handlePagination={this.handlePagination} />
        }
      </div>
    );
  }
}

UserRecipesPage.propTypes = {
  userRecipes: PropTypes.arrayOf(PropTypes.any).isRequired,
  handleGetUserRecipes: PropTypes.func.isRequired

};

const mapStateToProps = state => ({
  userRecipes: state.recipeReducer.userRecipes
});

export default connect(mapStateToProps, { handleGetUserRecipes })(UserRecipesPage);
