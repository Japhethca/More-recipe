import React, { Component } from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import Recipe from './Recipe';
import {getFavorites} from '../../actions/requestHandlers/handleUserFavorites';
import getAllRecipes from '../../actions/requestHandlers/getAllRecipes';



class TopRecipes extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hasErrored: false
    }
  }
  componentDidMount(){
    this.props.getFavorites(this.props.user.id);
  }
  render() {
    let {recipes} = this.props.recipes;
    const {favorites} = this.props;
    if (this.state.hasErrored){
      return (
        <div className='container'>
          <h5>No Recipe in the application, yet. Try adding a recipe.</h5>
        </div>
      
    );
    }
    return (
      <div className='container'>
        <ul className='row'>
          {recipes.map((val)=> {
            return <li className='col s12 m4'> <Recipe key={val.id} recipe={val} history={this.props.history} favorites={favorites} /> </li>
          })}
        </ul>
      </div>
    )
  }
}


TopRecipes.propTypes = {
  history: PropTypes.object.isRequired,
};

 const mapStateToProps = (state) => {
  return {
    recipes: state,
    user: state.auth.user
  }
};


export default connect(mapStateToProps, {getFavorites})(TopRecipes);
