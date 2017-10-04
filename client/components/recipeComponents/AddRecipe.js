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
    this.props.handleCreateRecipe(this.state).then(
      (res) => {
        this.props.addFlashMessage({
          type:'success',
          text: 'Recipe Added Successfully'
        });
        this.props.history.push('/myrecipes')
      },
      (err) => {this.setState({errors: err.data})}
    )
  }
  render() {
    return (
      <div>
        <div  className='card'>
          <form onSubmit={this.onSubmit} >
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
            </div> <div className='input-field' >
              <textarea 
                name='direction'
                onChange={this.onChange}
                className='materialize-textarea'
                />
                <label htmlFor='direction' > Direction </label>
            </div> <div className='input-field' >
              <textarea 
                name='ingredient'
                onChange={this.onChange}
                className='materialize-textarea'
                />
                <label htmlFor='ingredient' > Ingredient </label>
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