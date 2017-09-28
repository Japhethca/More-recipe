import { Component } from 'react';
import PropTypes from 'prop-types';

class Recipe extends Component {
  constructor(props) {
    super(props)

  }
  
  render() {
    return (
      <div className='row'>
        <div className="card col s12 m4">
          <div className="card-image">
            <img src="../../../images/image.jpg" alt="sample" />

            {/* <span className="card-title">Card Title</span> */}
          </div>
          <div className="card-content">
            <p>{this.props.recipe}</p>
          </div>
          <div className="card-action">
            <a href="#">This is a link</a>
            <a href='#'>This is a link</a>
          </div>
        </div>
      </div>
    )
  }
}
Recipe.propTypes = {
  recipe: PropTypes.func.isRequired,
}

export default Recipe;
