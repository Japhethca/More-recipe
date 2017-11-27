import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import NaviigationBar from '../components/navigation/NavigationBar';
import Footer from '../components/navigation/Footer';
import RecipeUpdate from '../components/myRecipe/RecipeUpdate';
import handleRecipeUpdate from '../actions/requestHandlers/handleRecipeUpdate';


const propTypes = {
  history: PropTypes.objectOf(PropTypes.any).isRequired,
  handleRecipeUpdate: PropTypes.func.isRequired
};

const RecipeUpdatePage = props => (
  <div>
    <NaviigationBar />
    <div className="container">
      <RecipeUpdate
        history={props.history}
        handleRecipeUpdate={props.handleRecipeUpdate}
      />
    </div>
    <Footer />
  </div>
);


RecipeUpdatePage.propTypes = propTypes;

export default connect(null, { handleRecipeUpdate })(RecipeUpdatePage);
