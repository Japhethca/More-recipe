import React, { Component } from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import Recipe from './Recipe';
import getAllRecipes from '../../actions/requestHandlers/getAllRecipes';



class TopRecipes extends Component {
  constructor(props) {
    super(props)
    this.state = {
      recipes: []
    }
  }
  
  componentDidMount() {
    this.props.getAllRecipes().then(
      (res) => {this.setState({['recipes']:res.data.List})},
      (err) => {console.log(err.data)}
    )
  }
  render() {
    let items = this.state.recipes;
    return (
      <div className='container'>
        <ul className='row'>
          {items.map((val)=> {
            return <li className='col s12 m4'> <Recipe key={val.id} recipe={val} history={this.props.history} /> </li>
          })}
        </ul>
      </div>
    )
  }
}


TopRecipes.propTypes = {
  getAllRecipes: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired,
}



export default connect(null, {getAllRecipes})(TopRecipes);
