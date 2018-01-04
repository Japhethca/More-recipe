import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';


import { Recipes } from '../../recipes';
import { getFavorites, getAllRecipes } from '../actions';
import Pagination from '../../common/Pagination';
import '../style.scss';

const propTypes = {
  getAllRecipes: PropTypes.func.isRequired,
  getFavorites: PropTypes.func.isRequired,
  recipes: PropTypes.arrayOf(PropTypes.any).isRequired,
};

class HomePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      recipes: this.props.recipes,
    };
  }

  componentDidMount = () => {
    this.props.getAllRecipes();
    this.props.getFavorites();
  }

  componentWillReceiveProps = (nextProps) => {
    if (nextProps.recipes !== this.props.recipes) {
      this.setState({ recipes: nextProps.recipes });
    }
  }

  handlePagination = (page) => {
    this.props.getAllRecipes(page.selected + 1);
  }
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

HomePage.propTypes = propTypes;

const mapStateToProps = state => ({
  recipes: state.recipeReducer.recipes
});

export default connect(mapStateToProps, { getAllRecipes, getFavorites })(HomePage);

