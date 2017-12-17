import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import LoadingIndicator from '../common/LoadingIndicator';
import './recipe_update_form.scss';


const propTypes = {
  handleRecipeUpdate: PropTypes.func.isRequired,
  recipe: PropTypes.objectOf(PropTypes.any).isRequired,
  modalContent: PropTypes.string.isRequired,
  modal: PropTypes.string.isRequired
};

class RecipeUpdate extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ingredients: this.props.recipe.ingredients,
      name: this.props.recipe.name,
      direction: this.props.recipe.direction,
      description: this.props.recipe.description,
      image: this.props.recipe.image,
      id: this.props.recipe.id
    };

    this.onSubmit = this.onSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
  }
  onSubmit(event) {
    event.preventDefault();
    this.props.handleRecipeUpdate(this.state);
  }
  onChange(event) {
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
  }

  render() {
    const {
      id, name, ingredients, description, direction, image
    } = this.state;
    return (
      <div className={this.props.modal} id={id}>
        <div className={`${this.props.modalContent}`}>
          <form onSubmit={this.onSubmit} className="card">
            <div className="update-title">
              <h4> Update Recipe </h4>
            </div>

            <div className="input-field" >
              <input
                type="text"
                name="name"
                onChange={this.onChange}
                value={name}
              />
              <label htmlFor="name" className="active" > Name </label>
            </div>
            <div className="input-field" >
              <textarea
                name="description"
                onChange={this.onChange}
                value={description}
                className="materialize-textarea"
              />
              <label htmlFor="description" className="active" > Description </label>
            </div>
            <div className="input-field" >
              <textarea
                name="direction"
                onChange={this.onChange}
                value={direction}
                className="materialize-textarea"
              />
              <label htmlFor="direction" className="active" > Direction </label>
            </div>
            <div className="input-field" >
              <textarea
                name="ingredient"
                onChange={this.onChange}
                value={ingredients}
                className="materialize-textarea"
              />
              <label htmlFor="ingredient" className="active" > Ingredient </label>
            </div>
            <div className="file-field input-field">
              <div className="btn brown upload-btn">
                <span>Upload Image</span>
                <input type="file" onChange={this.onChange} name="image" accept=".jpg, .jpeg, .png" />
              </div>
              <div className="file-path-wrapper">
                <img id="img1" src={image} height={70} className="right" alt=" " />
              </div>
              <LoadingIndicator />
            </div>
            <div>
              <button className="btn-large submit-btn" type="submit"> Update </button>
              <button className="btn-large right modal-close"> CLose</button>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

RecipeUpdate.propTypes = propTypes;

export default connect(null, { })(RecipeUpdate);
