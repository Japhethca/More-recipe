import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import NaviigationBar from '../components/navigation/NavigationBar';
import Footer from '../components/navigation/Footer';
import RecipeUpdate from '../components/myRecipe/RecipeUpdate';
import handleRecipeUpdate from '../actions/requestHandlers/handleRecipeUpdate';


const propTypes = {
  history: PropTypes.object.isRequired,
  handleRecipeUpdate: PropTypes.func.isRequired
};

class RecipeUpdatePage extends Component {
  render() {
    return (
      <div>
        <NaviigationBar />
        <div className="container">
          <RecipeUpdate
            history={this.props.history}
            handleRecipeUpdate={this.props.handleRecipeUpdate}
          />
        </div>
        <Footer />
      </div>
    );
  }
}

RecipeUpdatePage.propTypes = propTypes;

export default connect(null, { handleRecipeUpdate })(RecipeUpdatePage);
