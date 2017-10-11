import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Recipe from './Recipe';
import handleDeleteRecipe from '../../actions/requestHandlers/handleDeleteRecipe';
import getMyRecipes from '../../actions/requestHandlers/getMyRecipes';
import {connect} from 'react-redux';
import '../../styles/sass/my_recipes_page.scss';

class MyRecipes extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hasErrored: false
    };

  }
  componentDidMount(){
    this.props.getMyRecipes();/* .catch(
      err => this.setState({hasErrored: true})
    ); */
  }
  render() {
    let {userRecipes} = this.props.userRecipes;
    if (this.state.hasErrored){
      return (
        <div>
          <h5>User has not added any recipe, try adding one.</h5>
        </div>
      );
    }
    return (
      <div>
        
      
        <ul className='row'>
            {userRecipes.map((recipe) => {
              return <li className='col s12'> <Recipe key={recipe.id} handleDeleteRecipe={this.props.handleDeleteRecipe} recipe={recipe} showButtons/> </li>
            })}
        </ul>
       
      </div>
    )
  }
}

MyRecipes.propTypes = {
  getMyRecipes: PropTypes.func.isRequired,
  handleDeleteRecipe: PropTypes.func.isRequired
};

const mapStateToProps = (state) => {
  return {
    userRecipes: state
  }
}

export default connect(mapStateToProps, {getMyRecipes,handleDeleteRecipe})(MyRecipes);