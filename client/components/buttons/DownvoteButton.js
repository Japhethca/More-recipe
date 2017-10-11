import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import handleDownvote from '../../actions/requestHandlers/handleDownvote';
import '../../styles/sass/buttons.scss';

class DownvoteButton extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hasUpvoted: false,
    }

    this.onClick = this.onClick.bind(this);
    this.toggleUpvote = this.toggleUpvote.bind(this);
  }
  toggleUpvote(){
    if (this.state.hasUpvoted){
      this.setState({hasUpvoted: false});
    }else{
      this.setState({hasUpvoted: true});
    }
  }
  
  onClick(e){
    e.preventDefault();
    this.toggleUpvote();
    this.props.handleDownvote(this.props.recipe.id);
  }
  render() {
    return (
      <div className='action-btns'>
        <span onClick={this.onClick} className='btn brown darken'>
          <i className='material-icons'>thumb_down</i>&nbsp;
          {this.props.recipe.downvotes}
        </span>
      </div>
    );
  }
}

DownvoteButton.propTypes = {
  recipe: PropTypes.object.isRequired,
  handleDownvote: PropTypes.func.isRequired,
};

export default connect(null, {handleDownvote})(DownvoteButton);