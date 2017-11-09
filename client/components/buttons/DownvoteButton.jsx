import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import handleDownvote from '../../actions/requestHandlers/handleDownvote';
import './buttons.scss';


const propTypes = {
  recipe: PropTypes.object.isRequired,
  handleDownvote: PropTypes.func.isRequired,
};

class DownvoteButton extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hasUpvoted: false,
    };

    this.onClick = this.onClick.bind(this);
    this.toggleUpvote = this.toggleUpvote.bind(this);
  }

  onClick(e) {
    e.preventDefault();
    this.toggleUpvote();
    this.props.handleDownvote(this.props.recipe.id);
  }

  toggleUpvote() {
    if (this.state.hasUpvoted) {
      this.setState({ hasUpvoted: false });
    } else {
      this.setState({ hasUpvoted: true });
    }
  }

  render() {
    return (
      <div className="action-btns">
        <span onClick={this.onClick}>
          <i className="material-icons">thumb_down</i>&nbsp;
          {this.props.recipe.downvotes}
        </span>
      </div>
    );
  }
}

DownvoteButton.propTypes = propTypes;


export default connect(null, { handleDownvote })(DownvoteButton);
