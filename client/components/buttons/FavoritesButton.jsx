import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classname from 'classnames';
import { connect } from 'react-redux';
import { setFavorites, removeFavorite } from '../../actions/requestHandlers/handleUserFavorites';


const propTypes = {
  recipe: PropTypes.objectOf(PropTypes.any).isRequired,
  setFavorites: PropTypes.func.isRequired,
  removeFavorite: PropTypes.func.isRequired,
  favorites: PropTypes.arrayOf(PropTypes.object).isRequired
};

class FavoritesButton extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isFavorite: false
    };
  }
  componentDidMount() {
    this.isInFavorites();
  }

  onClick = (event) => {
    event.preventDefault();
    this.toggleFavorite();
    if (!this.state.isFavorite) {
      this.props.setFavorites(this.props.recipe);
    } else {
      this.props.removeFavorite(this.props.recipe.id);
    }
  }

  isInFavorites = () => {
    const checkFavorite = this.props.favorites.filter(favorite => favorite.id === this.props.recipe.id);
    if (checkFavorite.length > 0) {
      this.setState({ isFavorite: true });
      return true;
    }
  }

  toggleFavorite = () => {
    if (this.state.isFavorite) {
      this.setState({ isFavorite: false });
    } else {
      this.setState({ isFavorite: true });
    }
  }
  render() {
    return (
      <div className="action-btns">
        <span onClick={this.onClick} role="button" className={classname({ favorite: this.state.isFavorite, '': !this.state.isFavorite })} >
          <i className={classname('material-icons')}>favorite</i>
        </span>
      </div>
    );
  }
}

FavoritesButton.propTypes = propTypes;

const mapStateToProps = state => ({
  favorites: state.favorites
});


export default connect(mapStateToProps, { setFavorites, removeFavorite })(FavoritesButton);
