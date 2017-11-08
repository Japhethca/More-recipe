import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Recipe from './Recipe';
import { getFavorites } from '../../actions/requestHandlers/handleUserFavorites';
import getAllRecipes from '../../actions/requestHandlers/getAllRecipes';
import '../../styles/sass/topRecipes.scss';

class TopRecipes extends Component {
  constructor(props) {
    super(props);
    this.state = {
      favorites: [],
      hasErrored: false
    };
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.favorites !== nextProps.favorites) {
      this.setState({ favorites: nextProps.favorites });
    }
  }
  render() {
    const { recipes } = this.props.recipes;
    const { favorites } = this.props;
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
          <h4>Top Recipes</h4>
          <ul className="row" id="list">
            {recipes.map(val => (
              <li className="col s12 m4" key={val.id}>
                {this.state.favorites && <Recipe key={val.id} recipe={val} history={this.props.history} favorites={this.props.favorites} /> }
              </li>))
            }
          </ul>
        </div>

      </div>
    );
  }
}


TopRecipes.propTypes = {
  history: PropTypes.object.isRequired,
  favorites: PropTypes.array.isRequired
};

const mapStateToProps = state => ({
  recipes: state,
  user: state.auth.user,
  favorites: state.favorites
});


export default connect(mapStateToProps, { })(TopRecipes);
