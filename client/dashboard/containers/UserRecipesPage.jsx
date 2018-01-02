import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { Recipes } from '../../recipes';
import { handleGetUserRecipes } from '../actions';
import Pagination from '../../common/Pagination';


class UserRecipesPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userRecipes: this.props.userRecipes
    };
  }

  componentDidMount() {
    this.props.handleGetUserRecipes();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.userRecipes !== this.props.userRecipes) {
      this.setState({ userRecipes: nextProps.userRecipes });
    }
  }

  handlePagination = (page) => {
    this.props.handleGetUserRecipes(page.selected + 1);
  }

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
