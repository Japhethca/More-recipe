import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import qs from 'qs';

import { Recipes } from '../../recipes';
import { handleGetUserRecipes } from '../actions';
import Loader from '../../common/Loader';
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
      userRecipes: this.props.userRecipes.payload,
      page: this.props.history.location.search
    };
  }

  /**
   * @description makes an API call for user recipes on component mount
   * @memberof UserRecipesPage
   * @returns {none} - none
   */
  componentDidMount() {
    const { page } = qs.parse(this.state.page, { ignoreQueryPrefix: true });
    this.props.handleGetUserRecipes(page);
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
    if (nextProps.history.location.search !== this.props.history.location.search) {
      this.setState({ page: nextProps.history.location.search });
    }
  }

  /**
   * @description handles pagination
   * @memberof UserRecipesPage
   * @param {object} page
   * @returns {none} -none
   */
  handlePagination = (page) => {
    this.props.history.push(`/my-recipes?page=${page.selected + 1}`);
    this.props.handleGetUserRecipes(page.selected + 1);
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
          <div>
            <Recipes
              showActionBtns={false}
              showModifyButtons
              className="col s12 m6 l4"
              recipes={this.state.userRecipes}
              noItemText="No recipes! Create a recipe"
            />
            {
            this.state.userRecipes.length > 0 &&
            <Pagination
              handlePagination={this.handlePagination}
              totalPages={this.props.userRecipes.totalPages || 0}
              currentPage={this.props.userRecipes.currentPage - 1 || 0}
            />
          }
          </div>
        }
      </div>
    );
  }
}

UserRecipesPage.propTypes = {
  userRecipes: PropTypes.objectOf(PropTypes.shape).isRequired,
  handleGetUserRecipes: PropTypes.func.isRequired,
  history: PropTypes.objectOf(PropTypes.shape).isRequired,

};

const mapStateToProps = state => ({
  userRecipes: state.recipeReducer.userRecipes,
});

export default connect(mapStateToProps, { handleGetUserRecipes })(UserRecipesPage);
