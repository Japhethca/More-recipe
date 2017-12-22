import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';


import { recipeFormValidator } from '../../utils/validators';
import handleCreateRecipe from '../../actions/requestHandlers/handleCreateRecipe';
import './add_new_recipe.scss';


const propTypes = {
  handleCreateRecipe: PropTypes.func.isRequired,
};

class AddRecipe extends Component {
  constructor(props) {
    super(props);
    this.state = {
      recipeData: {},
      validationErrors: ''
    };
    this.recipeValues = {};
  }

  onChange = (event) => {
    if (event.target.name === 'image') {
      [this.recipeValues[event.target.name]] = event.target.files;
      this.setState({ recipeData: this.recipeValues });
      const reader = new FileReader();
      reader.onload = () => {
        const output = document.getElementById('img1');
        output.src = reader.result;
      };
      reader.readAsDataURL(event.target.files[0]);
    } else {
      this.recipeValues[event.target.name] = event.target.value;
      this.setState({ recipeData: this.recipeValues });
    }
  }

  onSubmit = (event) => {
    event.preventDefault();
    if (this.isValid()) {
      this.props.handleCreateRecipe(this.state.recipeData);
    }
  }

  isValid() {
    const { errors, isValid } = recipeFormValidator(this.state.recipeData);
    if (!isValid) {
      this.setState({ validationErrors: errors });
    }
    return isValid;
  }

  render() {
    const { validationErrors } = this.state;
    return (
      <div className="wrapper row">
        <div className="card col s12">
          <form onSubmit={this.onSubmit} ref={node => this.addRecipeForm = node}>
            <div className="input-field" >
              <input
                name="name"
                type="text"
                onChange={this.onChange}
              />
              <label htmlFor="name" > Name </label>
              {validationErrors.name && <span className="error-text"> { validationErrors.name[0] }</span>}
            </div>
            <div className="input-field" >
              <input
                name="description"
                onChange={this.onChange}
                type="text"
              />
              <label htmlFor="description" > Description </label>
              {validationErrors.description && <span className="error-text"> { validationErrors.description[0] }</span>}
            </div>
            <div className="row">
              <div className="input-field active col s12 m12 l6" >
                <textarea
                  name="direction"
                  onChange={this.onChange}
                  className="materialize-textarea"
                />
                <label htmlFor="direction" > Direction </label>
                {validationErrors.direction && <span className="error-text"> { validationErrors.direction[0] }</span>}
              </div>
              <div className="input-field active col s12 m12 l6" >
                <textarea
                  name="ingredients"
                  onChange={this.onChange}
                  className="materialize-textarea"
                />
                <label htmlFor="ingredients" > Ingredient </label>
                {validationErrors.ingredients && <span className="error-text"> { validationErrors.ingredients[0] }</span>}
              </div>
            </div>
            <div id="editor" />
            <div className="file-field input-field">
              <div className="btn brown waves-effect">
                <span>Add Image</span>
                <input type="file" onChange={this.onChange} name="image" accept=".jpg, .jpeg, .png" />
              </div>
              <div className="file-path-wrapper">
                <img id="img1" height={70} alt="" className="right" />
              </div>
            </div>
            <div>
              <button className="btn brown waves-effect waves-ripple" type="submit"> Submit </button>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

AddRecipe.propTypes = propTypes;


export default connect(null, { handleCreateRecipe })(AddRecipe);
