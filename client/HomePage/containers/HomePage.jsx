import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import qs from 'qs';

import Recipes from '../../Recipes';
import getAllRecipes from '../actions';
import { handleGetFavorites } from '../../Dashboard/actions';
import Pagination from '../../common/Pagination';
import Loader from '../../common/Loader';
import '../style.scss';

const propTypes = {
  getAllRecipes: PropTypes.func.isRequired,
  handleGetFavorites: PropTypes.func.isRequired,
  recipes: PropTypes.objectOf(PropTypes.any).isRequired,
  history: PropTypes.objectOf(PropTypes.any).isRequired,

};

/**
 * @description HomePage
 * @class HomePage
 * @extends {Component}
 */
class HomePage extends Component {
  /**
   * @description Creates an instance of Home.
   * @param {object} props
   * @memberof Home
   */
  constructor(props) {
    super(props);
    this.state = {
      recipes: this.props.recipes.payload,
      page: this.props.history.location.search
    };
  }

  /**
   * @description makes an api call on component mount
   * @memberof Home
   * @returns {undefined}
   */
  componentDidMount = () => {
    const { page } = qs.parse(this.state.page, { ignoreQueryPrefix: true });

    this.props.handleGetFavorites();
    this.props.getAllRecipes(page);
  }

  /**
   * @description sets state when a new props is received
   * @memberof Home
   * @param {Object} nextProps
   * @returns {undefined}
   */
  componentWillReceiveProps = (nextProps) => {
    if (nextProps.recipes !== this.props.recipes) {
      this.setState({ recipes: nextProps.recipes.payload });
    }
    if (this.props.history.location.search !== nextProps.history.location.search) {
      this.setState({ page: nextProps.history.location.search });
    }
  }

  /**
   * @description handles pagination page clicks
   * @memberof Home
   * @param {Number} page
   * @returns {undefined}
   */
  handlePagination = (page) => {
    this.props.history.push(`/recipes?page=${page.selected + 1}`);
    this.props.getAllRecipes(page.selected + 1);
  }

  /**
   * @description displays homepage recipes
   * @returns {ReactElement} markup
   */
  render() {
    const { isFetching } = this.props.recipes;
    return (
      <div className="container home-page">
        {
          isFetching ? <Loader isFetching />
          :
          <div>
            <h3>Latest Recipes</h3>
            <Recipes
              recipes={this.state.recipes}
              className="col s12 m6 l3"
              showActionBtns
            />
            <div className="pagination">
              {this.state.recipes.length > 0 &&
              <Pagination
                handlePagination={this.handlePagination}
                totalPages={this.props.recipes.totalPages || 0}
                currentPage={this.props.recipes.currentPage - 1 || 0}
              />
              }
            </div>
          </div>
        }
      </div>
    );
  }
}

HomePage.propTypes = propTypes;

const mapStateToProps = state => ({
  recipes: state.recipeReducer.recipes,
});

export default connect(mapStateToProps, {
  getAllRecipes,
  handleGetFavorites
})(HomePage);

