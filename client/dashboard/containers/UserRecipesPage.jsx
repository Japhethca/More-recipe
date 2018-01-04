import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { Recipes } from '../../recipes';
import { handleGetUserRecipes } from '../actions';
import Pagination from '../../common/Pagination';

/**
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
   * component life cycle method
   * @memberof UserRecipesPage
   * @returns {none} - none
   */
  componentDidMount() {
    this.props.handleGetUserRecipes();
  }

  /**
   *
   *
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
   * @memberof UserRecipesPage
   * @param {object} page
   * @returns {none} -none
   */
  handlePagination = (page) => {
    this.props.handleGetUserRecipes(page.selected + 1);
  }

  /**
   * @description displays dashboard
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
          noItemText="No recipes, click 'Add Recipe' to create recipe"
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
