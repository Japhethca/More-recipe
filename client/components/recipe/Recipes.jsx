import React, { Component } from 'react';
import PropTypes from 'prop-types';
import qs from 'qs';

import Pagination from '../common/Pagination';
import Recipe from './Recipe';
import './Recipes.scss';


const propTypes = {
  history: PropTypes.objectOf(PropTypes.any).isRequired,
  favorites: PropTypes.arrayOf(PropTypes.object).isRequired,
  recipes: PropTypes.arrayOf(PropTypes.object).isRequired,
  getRecipes: PropTypes.func.isRequired,
};

class Recipes extends Component {
  constructor(props) {
    super(props);
    this.state = {
      favorites: [],
      query: this.props.history.location.search,
      hasErrored: false
    };
  }

  componentDidMount() {
    const { page } = qs.parse(this.state.query, { ignoreQueryPrefix: true });
    this.props.getRecipes(parseInt(page, 10));
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.favorites !== nextProps.favorites) {
      this.setState({ favorites: nextProps.favorites });
    }
  }

  render() {
    const { recipes } = this.props;
    if (this.state.hasErrored) {
      return (
        <div className="container">
          <h5>No Recipe in the application, yet. Try adding a recipe.</h5>
        </div>
      );
    }
    return (
      <div className="container">
        <div className="recipe-list-container">
          <h4>Latest Recipes</h4>
          <ul className="row" id="list">
            {recipes.map(val => (
              <li className="col s12 m4 l3" key={val.id}>
                {this.state.favorites && <Recipe key={val.id} recipe={val} history={this.props.history} favorites={this.props.favorites} /> }
              </li>))
            }
          </ul>
          <Pagination baseURL="/" />
        </div>
      </div>
    );
  }
}


Recipes.propTypes = propTypes;


export default Recipes;
