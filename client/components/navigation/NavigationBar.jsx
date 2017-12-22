import React, { Component } from 'react';
import { NavLink, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import SearchForm from '../search/SearchForm';
import { logout } from '../../actions/requestHandlers/handleLoginrequest';
import Button from '../common/Button';
import './navigationBar.scss';


const propTypes = {
  user: PropTypes.objectOf(PropTypes.any).isRequired,
  logout: PropTypes.func.isRequired,
  history: PropTypes.objectOf(PropTypes.any).isRequired
};

class NavigationBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isSearching: false
    };
    this.toggleSearch = this.toggleSearch.bind(this);
    this.onClick = this.onClick.bind(this);
  }
  componentDidMount() {
    $('.button-collapse').sideNav({
      menuWidth: 300,
      edge: 'left',
      closeOnClick: true,
      draggable: true,
    });
    $('.collapsible').collapsible();
    $('.dropdown-button').dropdown({
      inDuration: 300,
      outDuration: 225,
      constrainWidth: false,
      hover: true,
      gutter: 0, // Spacing from edge
      belowOrigin: true,
      // alignment: 'left',
      stopPropagation: false // Stops event propagation
    });
  }

  onClick() {
    this.props.logout();
    this.props.history.push('/landing');
  }
  toggleSearch() {
    const toggle = document.getElementById('toggle');
    toggle.innerHTML = !this.state.isSearching ? 'close' : 'search';
    this.setState({ isSearching: !this.state.isSearching });
  }
  render() {
    const { isAuthenticated } = this.props.user;

    const userLinks = (
      <div>
        <ul id="dropdown1" className="dropdown-content">
          <li><NavLink to="/profile">Profile</NavLink></li>
          <li><NavLink to="/myrecipes">My Recipes</NavLink></li>
          <li ><NavLink to="/favorites">Favorites</NavLink></li>
          <li ><button className="" onClick={this.onClick}>Logout</button></li>
        </ul>
        <ul className="nav-mobile hide-on-large-only">
          <li className="right search-icon" onClick={this.toggleSearch} ><i className="material-icons medium" id="toggle" >search</i></li>
        </ul>
        <ul className="nav-mobile hide-on-med-and-down right">
          <li><SearchForm history={this.props.history} /></li>
          <li><NavLink to="/new-recipe" href="/new-recipe">Add Recipe</NavLink></li>
          <li><NavLink className="dropdown-button" to="/profile" href="" data-activates="dropdown1">Profile <i className="material-icons right">arrow_drop_down</i></NavLink></li>
        </ul>
        <ul className="side-nav" id="more-recipe">
          <li><NavLink to="/myrecipes" activeClassName="active"><i className="fa fa-cutlery prefix" aria-hidden="true" />My Recipes</NavLink></li>
          <li><NavLink to="/favorites" activeClassName="active"><i className="fa fa-heart prefix" aria-hidden="true" />Favorites</NavLink></li>
          <li><NavLink to="/profile" activeClassName="active"><i className="fa fa-user prefix" aria-hidden="true" />Profile</NavLink></li>
          <li ><button className="" alt="" onClick={this.onClick}>Logout</button></li>
        </ul>

      </div>
    );

    const guestLinks = (
      <div>
        <ul className="side-nav" id="more-recipe">
          <li ><NavLink to="/signin" > <Button text="Log In" className="nav-btn" /></NavLink></li>
          <li><NavLink to="/signup"><Button text="Sign Up" className="nav-btn" /></NavLink></li>
        </ul>
        <ul className="nav-mobile right hide-on-med-and-down">
          <li ><NavLink to="/signin" > <Button text="Log In" className="nav-btn" /></NavLink></li>
          <li><NavLink to="/signup"><Button text="Sign Up" className="nav-btn" /></NavLink></li>
        </ul>
      </div>
    );

    return (
      <div>
        <nav className="nav-extended nav-menu">
          <div className="nav-wrapper">
            <div className="container-fluid">
              {
                <NavLink
                  to="/"
                  id="brand-logo"
                  className="brand-logo"
                >
                More Recipe
                  {/* <img
                    className="img image-responsive"
                    // src="http://res.cloudinary.com/dcmxbxzyj/image/upload/v1508597712/more-recipe-logo3_hssqkb.png"
                    alt="" */}
                  {/* /> */}
                </NavLink>
            }
              <NavLink to="" data-activates="more-recipe" className="button-collapse"><i className="material-icons">menu</i></NavLink>
              {isAuthenticated ? userLinks : guestLinks}
            </div>
          </div>
        </nav>
        <div className="container">
          {this.state.isSearching &&
          <SearchForm history={this.props.history} />
          }
        </div>
      </div>
    );
  }
}

NavigationBar.propTypes = propTypes;

const mapStateToProps = state => ({
  user: state.auth
});

export default withRouter(connect(mapStateToProps, { logout })(NavigationBar));
