import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classname from 'classnames';


const propTypes = {
  isInFavorites: PropTypes.func.isRequired,
  onFavoriteClick: PropTypes.func.isRequired,
  isFavorite: PropTypes.bool.isRequired
};

class FavoritesButton extends Component {
  // constructor(props) {
  //   super(props);
  //   this.state = {
  //     isFavorite: this.props.isFavorite
  //   };
  // }

  // componentWillReceiveProps(nextProps) {
  //   if (this.props.isFavorite !== nextProps.isFavorite) {
  //     this.setState({ isFavorite: nextProps.isFavorite });
  //   }
  // }

  render() {
    return (
      <div className="action-btns">
        <button
          onClick={this.props.onFavoriteClick}
          className={classname({ favorite: this.props.isInFavorites(), '': !this.props.isInFavorites() })}
        >
          <i className={classname('material-icons')}>favorite_border</i>
        </button>
      </div>
    );
  }
}

FavoritesButton.propTypes = propTypes;


export default FavoritesButton;
