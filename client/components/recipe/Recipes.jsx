import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Recipe from './Recipe';
import './Recipes.scss';


const propTypes = {
  history: PropTypes.objectOf(PropTypes.any).isRequired,
  favorites: PropTypes.arrayOf(PropTypes.object).isRequired,
  recipes: PropTypes.arrayOf(PropTypes.object).isRequired
};

class Recipes extends Component {
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
              <li className="col s12 m6 l4" key={val.id}>
                {this.state.favorites && <Recipe key={val.id} recipe={val} history={this.props.history} favorites={this.props.favorites} /> }
              </li>))
            }
          </ul>
        </div>
      </div>
    );
  }
}


Recipes.propTypes = propTypes;

const mapStateToProps = state => ({
  recipes: state.recipes,
  user: state.auth.user,
  favorites: state.favorites
});


export default connect(mapStateToProps, { })(Recipes);
