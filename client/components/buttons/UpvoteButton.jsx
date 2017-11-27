import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import handleUpvote from '../../actions/requestHandlers/handleUpvote';
import './buttons.scss';


const propTypes = {
  recipe: PropTypes.objectOf(PropTypes.any).isRequired,
  handleUpvote: PropTypes.func.isRequired,
};

const UpvoteButton = (props) => {
  const onClick = (event) => {
    event.preventDefault();
    props.handleUpvote(props.recipe.id);
  };
  return (
    <div className="action-btns">
      <button onClick={onClick} className="" data-index={props.recipe.id}>
        <i className="material-icons">thumb_up</i>&nbsp;
        {props.recipe.upvotes}
      </button>
    </div>
  );
};

UpvoteButton.propTypes = propTypes;

export default connect(null, { handleUpvote })(UpvoteButton);
