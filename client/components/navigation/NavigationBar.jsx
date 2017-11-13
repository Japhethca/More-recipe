import React, { Component } from 'react';
import { NavLink, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import SearchForm from '../search/SearchForm';
import { logout } from '../../actions/requestHandlers/handleLoginrequest';
import './navigationBar.scss';


const propTypes = {
  user: PropTypes.object.isRequired,
  logout: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired
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
  }

  onClick() {
    this.props.logout();
    this.props.history.push('/signin');
  }
  toggleSearch() {
    const logo = document.getElementById('brand-logo');
    const toggle = document.getElementById('toggle');
    logo.style = !this.state.isSearching ? 'display:none' : '';
    toggle.innerHTML = !this.state.isSearching ? 'close' : 'search';
    this.setState({ isSearching: !this.state.isSearching });
  }
  render() {
    const { isAuthenticated } = this.props.user;

    const userLinks = (
      <div>
        <ul className="nav-mobile hide-on-large-only">
          <li className="right search-icon" onClick={this.toggleSearch} ><i className="material-icons medium" id="toggle" >search</i></li>
          {this.state.isSearching && 
          <SearchForm history={this.props.history} />
          }
        </ul>
        <ul className="nav-mobile hide-on-med-and-down right">
          <SearchForm history={this.props.history} />
          <li><NavLink to="/myrecipes">My Recipes</NavLink></li>
          <li ><NavLink to="/favorites">Favorites</NavLink></li>
          <li><NavLink to="/profile"><i className="material-icons large left">account_circle</i>Profile</NavLink></li>
          <li ><a className="btn" onClick={this.onClick}>Logout</a></li>
        </ul>
        <ul className="side-nav" id="more-recipe">
          <li><NavLink to="/myrecipes" activeClassName="active"><i className="fa fa-cutlery prefix" aria-hidden="true" />My Recipes</NavLink></li>
          <li><NavLink to="/favorites" activeClassName="active"><i className="fa fa-heart prefix" aria-hidden="true" />Favorites</NavLink></li>
          <li><NavLink to="/profile" activeClassName="active"><i className="fa fa-user prefix" aria-hidden="true" />Profile</NavLink></li>
          <li ><a className="btn" alt="" onClick={this.onClick}>Logout</a></li>
        </ul>
      </div>
    );

    const guestLinks = (
      <div>
        <ul className="side-nav" id="more-recipe">
          <li ><NavLink className="btn" to="/signin" >Login</NavLink></li>
          <li><NavLink className="btn" to="/signup">SignUp</NavLink></li>
        </ul>
        <ul className="nav-mobile right hide-on-med-and-down">
          <li ><NavLink className="btn brown-text" to="/signin" >Login</NavLink></li>
          <li><NavLink className="btn brown-text" to="/signup">SignUp</NavLink></li>
        </ul>
      </div>
    );

    return (
      <div>
        <nav className="nav-extended nav-menu">
          <div className="nav-wrapper">
            <div className="container">
              {<NavLink to="/" id="brand-logo" className="brand-logo"><img className="img image-responsive" src="http://res.cloudinary.com/dcmxbxzyj/image/upload/v1508597712/more-recipe-logo3_hssqkb.png" alt="" /></NavLink>}
              <NavLink to="" data-activates="more-recipe" className="button-collapse"><i className="material-icons">menu</i></NavLink>
              {isAuthenticated ? userLinks : guestLinks}
            </div>
          </div>
        </nav>
      </div>
    );
  }
}

NavigationBar.propTypes = propTypes;

const mapStateToProps = state => ({
  user: state.auth
});

export default withRouter(connect(mapStateToProps, { logout })(NavigationBar));
