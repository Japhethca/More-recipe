import React, { Component } from 'react';
import PropTypes from 'prop-types';
import '../../styles/sass/recipe_update_form.scss';

class RecipeUpdate extends Component {
  constructor(props) {
    super(props)
    this.state= {
      ingredient: this.props.history.location.state.ingredients,
      name: this.props.history.location.state.name,
      direction: this.props.history.location.state.direction,
      description: this.props.history.location.state.description,
      id: this.props.history.location.state.id
    };

    this.onSubmit = this.onSubmit.bind(this)
    this.onChange = this.onChange.bind(this)
  }
  
  onSubmit(e){
    e.preventDefault();
     
    this.props.handleRecipeUpdate(this.state).then(
      (res) => {this.props.history.push('/myrecipes')}
    );
  }
  onChange(e){
    this.setState({[e.target.name]: e.target.value})
  }

  render() {
    const {name, ingredient, description, direction} = this.state; 
    return (
      <div className='update-form'>
        <div className='row  z-depth-3'>
          <form onSubmit={this.onSubmit} className='col s12 m8 offset-m2'>
            <div className='update-title'>
              <h3> Update Recipe Details </h3>
            </div>
            
            <div className='input-field' >
              <input 
                type='text'
                name='name'
                onChange={this.onChange}
                value={name}
                />
                <label htmlFor='name' className='active' > Name </label>
            </div>
            <div className='input-field' >
              <textarea
                name='description'
                onChange={this.onChange}
                value={description}
                className='materialize-textarea'
                />
                <label htmlFor='description' className='active' > Description </label>
            </div> <div className='input-field' >
              <textarea 
                name='direction'
                onChange={this.onChange}
                value={direction}
                className='materialize-textarea'
                />
                <label htmlFor='direction' className='active' > Direction </label>
            </div> <div className='input-field' >
              <textarea 
                name='ingredient'
                onChange={this.onChange}
                value={ingredient}
                className='materialize-textarea'
                />
                <label htmlFor='ingredient' className='active' > Ingredient </label>
            </div>
            <div className='row'>
              <button className='btn-large brown waves-effect waves-ripple col s6 offset-3 m6 offset-m3 center'  type='submit'> Update </button>
            </div>
          </form>
        </div>
      </div>
    )
  }
}

RecipeUpdate.propTypes = {
  history: PropTypes.object.isRequired,
  handleRecipeUpdate: PropTypes.func.isRequired
}

export default RecipeUpdate