import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import handleUpvote from '../../actions/requestHandlers/handleUpvote';
import '../../styles/sass/buttons.scss';

class UpvoteButton extends Component {
  constructor(props) {
    super(props);
    this.state = {
      upvote: 0,
    }

    this.onClick = this.onClick.bind(this);
  }
  
  componentWillRecieveProps(nextProps){
    if (nextProps.recipe !== this.props.recipe){
      this.props.recipe = nextProps.recipe;
    }
  }
  onClick(e){
    e.preventDefault();
    this.props.handleUpvote(this.props.recipe.id);
  }
  render() {
    return (
      <div className='action-btns'>
        <span onClick={this.onClick} className='btn brown darken'>
          <i className='material-icons'>thumb_up</i>&nbsp;
          {this.props.recipe.upvotes}
        </span>
      </div>
    );
  }
}

UpvoteButton.propTypes = {
  recipe: PropTypes.object.isRequired,
  handleUpvote: PropTypes.func.isRequired,
};

export default connect(null, {handleUpvote})(UpvoteButton);