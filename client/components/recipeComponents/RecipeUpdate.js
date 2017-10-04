import React, { Component } from 'react'
import PropTypes from 'prop-types'

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
      (res) => {this.props.history.push('/myrecipes')},
      (err) => {}
    )
  }
  onChange(e){
    this.setState({[e.target.name]: e.target.value})
  }

  render() {
    const {name, ingredient, description, direction} = this.state; 
    return (
      <div>
        <div>
          <form onSubmit={this.onSubmit}>
            <h3> Update Recipe </h3>
            <div className='input-field' >
              <input 
                type='text'
                name='name'
                onChange={this.onChange}
                value={name}
                />
                <label htmlFor='name' > Name </label>
            </div>
            <div className='input-field' >
              <textarea
                name='description'
                onChange={this.onChange}
                value={description}
                className='materialize-textarea'
                />
                <label htmlFor='description' > Description </label>
            </div> <div className='input-field' >
              <textarea 
                name='direction'
                onChange={this.onChange}
                value={direction}
                className='materialize-textarea'
                />
                <label htmlFor='direction' > Direction </label>
            </div> <div className='input-field' >
              <textarea 
                name='ingredient'
                onChange={this.onChange}
                value={ingredient}
                className='materialize-textarea'
                />
                <label htmlFor='ingredient' > Ingredient </label>
            </div>
            <div>
              <button className='btn brown waves-effect waves-ripple' type='submit'> Update </button>
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