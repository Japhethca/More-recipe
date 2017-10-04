import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import handleDownvote from '../../actions/requestHandlers/handleDownvote';

class DownvoteButton extends Component {
  constructor(props) {
    super(props);
    this.state = {
      downvote: 0,
    }

    this.onClick = this.onClick.bind(this);
  }
  
  
  onClick(e){
    e.preventDefault();
    this.props.handleDownvote(this.props.recipe.id);
    this.props.setNewState();
  }
  render() {
    return (
      <div>
        <span onClick={this.onClick} className='btn brown lighten-2'>
          <i className='material-icons'>thumb_down</i>
          {this.props.recipe.downvotes}
        </span>
      </div>
    );
  }
}

DownvoteButton.propTypes = {
  recipe: PropTypes.object.isRequired,
  handleDownvote: PropTypes.func.isRequired,
  setNewState: PropTypes.func.isRequired
};

export default connect(null, {handleDownvote})(DownvoteButton);