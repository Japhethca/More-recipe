import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import handleDownvote from '../../actions/requestHandlers/handleDownvote';
import './buttons.scss';


const propTypes = {
  recipe: PropTypes.objectOf(PropTypes.any).isRequired,
  handleDownvote: PropTypes.func.isRequired,
};

const DownvoteButton = (props) => {
  const onClick = (event) => {
    event.preventDefault();
    props.handleDownvote(props.recipe.id);
  };

  return (
    <div className="action-btns">
      <span onClick={onClick}>
        <i className="material-icons">thumb_down</i>&nbsp;
        {props.recipe.downvotes}
      </span>
    </div>
  );
};

DownvoteButton.propTypes = propTypes;


export default connect(null, { handleDownvote })(DownvoteButton);
