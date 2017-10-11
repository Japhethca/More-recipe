import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import handleCreateRecipe from '../../actions/requestHandlers/handleCreateRecipe';


class AddRecipe extends Component {
  constructor(props){
    super(props);
    this.state = {
      name: '',
      description: '',
      ingredient: '',
      direction: '',
      errors: ''
    }

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onChange(e){
    this.setState( {[e.target.name]: e.target.value });
  }
  onSubmit(e){
    e.preventDefault();
    this.props.handleCreateRecipe(this.state);
    this.addRecipeForm.reset();
  }
  render() {
    return (
      <div>
        <div  className='card'>
          <form onSubmit={this.onSubmit} ref={(node) => this.addRecipeForm = node}>
            <h4> Add New Recipe </h4>
            <div className='input-field' >
              <input 
                name='name'
                type='text'
                onChange={this.onChange}
                />
                <label htmlFor='name' > Name </label>
            </div>
            <div className='input-field' >
              <textarea 
                name='description'
                onChange={this.onChange}
                className='materialize-textarea'
                />
                <label htmlFor='description' > Description </label>
            </div> 
            <span>Add list of direction separated by comma (,).</span>
            <div className='input-field' >
              <textarea 
                name='direction'
                onChange={this.onChange}
                className='materialize-textarea'
                />
                <label htmlFor='direction' > Direction </label>
            </div>
            <span>Add list of ingredients  separated by comma (,).</span>
            <div className='input-field' >
              
              <textarea 
                name='ingredient'
                onChange={this.onChange}
                className='materialize-textarea'
                />
                <label htmlFor='ingredient' > Ingredient </label>
            </div>
            <div className="file-field input-field">
            <div className="btn blue-text white">
              <span>Image</span>
              <input type="file" name='image' />
            </div>
            <div className="file-path-wrapper">
              <input className="file-path validate" type="text" />
            </div>
          </div>
            <div>
              <button className='btn brown waves-effect waves-ripple' type='submit'> Submit </button>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

AddRecipe.propTypes = {
  handleCreateRecipe: PropTypes.func.isRequired,
  addFlashMessage: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired
}


export default connect(null, {handleCreateRecipe})(AddRecipe);