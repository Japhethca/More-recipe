import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import TinyMCE from 'react-tinymce';


import { recipeFormValidator } from '../../utils/validators';
import handleCreateRecipe from '../../actions/requestHandlers/handleCreateRecipe';
import handleRecipeUpdate from '../../actions/requestHandlers/handleRecipeUpdate';
import './recipeForm.scss';


const propTypes = {
  title: PropTypes.string,
  type: PropTypes.string,
  handleCreateRecipe: PropTypes.func,
  handleRecipeUpdate: PropTypes.func,
  recipe: PropTypes.objectOf(PropTypes.any)
};

class RecipeForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: this.props.recipe.id || '',
      name: this.props.recipe.name || '',
      description: this.props.recipe.description || '',
      ingredients: this.props.recipe.ingredients || '',
      direction: this.props.recipe.direction || '',
      image: this.props.recipe.image || '',
      validationErrors: ''
    };

    this.editorConfig = {
      menubar: false,
      statusbar: false,
      plugins: 'lists textcolor',
      toolbar: 'bullist numlist | bold italic | forecolor strikethrough'
    };
  }

  onChange = (event) => {
    if (event.target.name === 'image') {
      this.setState({ image: event.target.files[0] });
      const reader = new FileReader();
      reader.onload = () => {
        const output = document.getElementById('img1');
        output.src = reader.result;
      };
      reader.readAsDataURL(event.target.files[0]);
    } else {
      this.setState({ [event.target.name]: event.target.value });
    }
    this.isValid();
  }

  onSubmit = (event) => {
    event.preventDefault();
    if (this.isValid()) {
      return this.props.type === 'create' ?
        this.props.handleCreateRecipe(this.state) :
        this.props.handleRecipeUpdate(this.state);
    }
  }

  handleEditorChange = (event) => {
    if (event.target.targetElm.name === 'direction') {
      this.setState({ direction: event.target.getContent() });
    } else {
      this.setState({ ingredients: event.target.getContent() });
    }
    this.isValid();
  }

  isValid() {
    const { errors, isValid } = recipeFormValidator(this.state);
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
          <h4 className="header">{this.props.title}</h4>
          <form onSubmit={this.onSubmit} ref={node => this.addRecipeForm = node}>
            <div className="input-field" >
              <input
                name="name"
                type="text"
                value={this.state.name}
                onChange={this.onChange}
              />
              <label htmlFor="name" > Name </label>
              {validationErrors.name && <span className="error-text"> { validationErrors.name[0] }</span>}
            </div>
            <div className="input-field" >
              <input
                name="description"
                value={this.state.description}
                onChange={this.onChange}
                type="text"
              />
              <label htmlFor="description" > Description </label>
              {validationErrors.description && <span className="error-text"> { validationErrors.description[0] }</span>}
            </div>
            <div>
              <h5>Ingredients</h5>
              {validationErrors.ingredients && <span className="error-text"> { validationErrors.ingredients[0] }</span>}
              <TinyMCE
                content={this.state.ingredients}
                config={this.editorConfig}
                onChange={this.handleEditorChange}
                name="ingredients"
              />
            </div>
            <div>
              <h5>Directions</h5>
              {validationErrors.direction && <span className="error-text"> { validationErrors.direction[0] }</span>}
              <TinyMCE
                content={this.state.direction}
                config={this.editorConfig}
                onChange={this.handleEditorChange}
                name="direction"
              />
            </div>
            <hr />
            <div>
              <input type="file" onChange={this.onChange} name="image" accept=".jpg, .jpeg, .png" />
              <img
                id="img1"
                src={this.state.image ||
                  'http://res.cloudinary.com/dcmxbxzyj/image/upload/v1511526912/recipe-card-placeholder_ta9ikp.jpg'}
                alt="Recipe"
                className="image-class"
              />
            </div>
            <div className="input-btn">
              <button className="submit-btn waves-effect waves-ripple" type="submit"> Submit </button>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

RecipeForm.propTypes = propTypes;

RecipeForm.defaultProps = {
  recipe: {},
  handleCreateRecipe: null,
  handleRecipeUpdate: null,
  type: 'create',
  title: 'Create New Recipe'
};

export default connect(null, { handleCreateRecipe, handleRecipeUpdate })(RecipeForm);
