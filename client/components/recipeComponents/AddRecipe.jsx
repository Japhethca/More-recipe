import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import handleCreateRecipe from '../../actions/requestHandlers/handleCreateRecipe';
import { uploadImage } from '../../actions/requestHandlers/handleFileUpload';
import '../../styles/sass/add_new_recipe.scss';


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
    this.handleImage = this.handleImage.bind(this);
  }

  onChange(e) {
    if (e.target.name === 'image') {
      this.setState({ image: e.target.files[0] });
      // this.handleImage(e.target.files[0]);
    } else {
      this.setState({ [e.target.name]: e.target.value });
    }
  }

  onSubmit(e) {
    e.preventDefault();
    this.props.handleCreateRecipe(this.state);
    this.addRecipeForm.reset();
    // this.setState({ image: '' });
  }

  handleImage(data) {
    this.props.uploadImage(data).end((err, res) => {
      if (!err && res.ok) {
        this.setState({ image: res.body.url });
      } else {
        console.log(err || res.error);
      }
    });
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
            <div className="choose-file">
              <label className="btn brown" htmlFor="image">Upload Image</label>
              <input type="file" id="image" onChange={this.onChange} name="image" accept=".jpg, .jpeg, .png" />
            </div>
            <div className="image-preview" />
            <div>
              <button className="btn brown waves-effect waves-ripple" type="submit"> Submit </button>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

AddRecipe.propTypes = {
  handleCreateRecipe: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired,
  uploadImage: PropTypes.func.isRequired,
  image: PropTypes.string.isRequired
};
const mapStateToProps = state => ({
  image: state.image
});

export default connect(mapStateToProps, { handleCreateRecipe, uploadImage })(AddRecipe);
