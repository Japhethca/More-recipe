import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import qs from 'qs';

import { Recipes } from '../../recipes';
import { getFavorites, getAllRecipes } from '../actions';
import Pagination from '../../common/Pagination';
import '../style.scss';

const propTypes = {
  getAllRecipes: PropTypes.func.isRequired,
  getFavorites: PropTypes.func.isRequired,
  recipes: PropTypes.arrayOf(PropTypes.any).isRequired,
};

/**
 * @class Home
 * @extends {Component}
 */
class Home extends Component {
  /**
   * Creates an instance of Home.
   * @param {object} props
   * @memberof Home
   */
  constructor(props) {
    super(props);
    this.state = {
      recipes: this.props.recipes,
    };
  }

  /**
   * @memberof Home
   * @returns {undefined}
   */
  componentDidMount = () => {
    this.props.getAllRecipes();
    this.props.getFavorites();
  }

  /**
   * @memberof Home
   * @param {Object} nextProps
   * @returns {undefined}
   */
  componentWillReceiveProps = (nextProps) => {
    if (nextProps.recipes !== this.props.recipes) {
      this.setState({ recipes: nextProps.recipes });
    }
  }

  /**
   * handles pagination page clicks
   * @memberof Home
   * @param {Number} page
   * @returns {undefined}
   */
  handlePagination = (page) => {
    this.props.getAllRecipes(page.selected + 1);
  }

  /**
   * @description displays homepage recipes
   * @returns {ReactElement} markup
   */
  render() {
    return (
      <div className="container home-page">
        <div>
          <h3>Latest Recipes</h3>
          <Recipes
            recipes={this.state.recipes}
            className="col s12 m6 l3"
            showActionBtns
          />
          <div className="pagination">
            {this.state.recipes.length > 0 && <Pagination handlePagination={this.handlePagination} />}
          </div>
        </div>
      </div>
    );
  }
}

Home.propTypes = propTypes;

const mapStateToProps = state => ({
  recipes: state.recipeReducer.recipes
});

export default connect(mapStateToProps, { getAllRecipes, getFavorites })(Home);

