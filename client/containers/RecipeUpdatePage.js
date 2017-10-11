import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import NaviigationBar from '../components/NavigationBar';
import Footer from '../components/Footer';
import RecipeUpdate from '../components/recipeComponents/RecipeUpdate';
import handleRecipeUpdate from '../actions/requestHandlers/handleRecipeUpdate';

class RecipeUpdatePage extends Component {
  constructor(props) {
    super(props)

  }

  
  render() {
    return (
      <div>
        <NaviigationBar />
        <div className='container'>
          <RecipeUpdate 
            history={this.props.history}
            handleRecipeUpdate={this.props.handleRecipeUpdate}
          />
        </div>  
        <Footer/>
      </div>
    )
  }
}

RecipeUpdatePage.propTypes = {
  history: PropTypes.object.isRequired,
  handleRecipeUpdate: PropTypes.func.isRequired
}

export default connect(null, {handleRecipeUpdate})(RecipeUpdatePage); 