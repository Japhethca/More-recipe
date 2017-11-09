import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import handleCreateRecipe from '../../actions/requestHandlers/handleCreateRecipe';
import './add_new_recipe.scss';


const propTypes = {
  handleCreateRecipe: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired,
};

class AddRecipe extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      description: '',
      ingredient: '',
      direction: '',
      image: '',
      errors: '',
      isLoading: false
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onChange(e) {
    if (e.target.name === 'image') {
      this.setState({ image: e.target.files[0] });
      const reader = new FileReader();
      reader.onload = () => {
        const output = document.getElementById('img1');
        output.src = reader.result;
      };
      reader.readAsDataURL(e.target.files[0]);
    } else {
      this.setState({ [e.target.name]: e.target.value });
    }
  }

  onSubmit(e) {
    e.preventDefault();
    this.props.handleCreateRecipe(this.state);
    this.addRecipeForm.reset();
  }

  render() {
    return (
      <div>
        <div className="card">
          <form onSubmit={this.onSubmit} ref={node => this.addRecipeForm = node}>
            <h4>New Recipe </h4>
            <div className="input-field" >
              <input
                name="name"
                type="text"
                onChange={this.onChange}
              />
              <label htmlFor="name" > Name </label>
            </div>
            <div className="input-field" >
              <textarea
                name="description"
                onChange={this.onChange}
                className="materialize-textarea"
              />
              <label htmlFor="description" > Description </label>
            </div>
            <div className="input-field active" >
              <textarea
                name="direction"
                onChange={this.onChange}
                className="materialize-textarea"
                placeholder="Add list of direction separated by comma (,)"
              />
              <label htmlFor="direction" > Direction </label>
            </div>
            <div className="input-field active" >
              <textarea
                name="ingredient"
                onChange={this.onChange}
                className="materialize-textarea"
                placeholder="Add list of ingredients  separated by comma (,)"
              />
              <label htmlFor="ingredient" > Ingredient </label>
            </div>

            <div className="file-field input-field">
              <div className="btn brown waves-effect">
                <span>Image Upload</span>
                <input type="file" onChange={this.onChange} name="image" accept=".jpg, .jpeg, .png"/>
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
