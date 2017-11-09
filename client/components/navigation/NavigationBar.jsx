import React, { Component } from 'react';
import { NavLink, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import SearchForm from './SearchForm';
import { logout } from '../actions/requestHandlers/handleLoginrequest';
import '../styles/sass/navigationBar.scss';

class NavigationBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isSearching: false
    };
    this.toggleSearch = this.toggleSearch.bind(this);
  }
  componentDidMount() {
    $('.button-collapse').sideNav({
      menuWidth: 300, // Default is 300
      edge: 'left', // Choose the horizontal origin
      closeOnClick: true, // Closes side-nav on <a> clicks, useful for Angular/Meteor
      draggable: true, // Choose whether you can drag to open on touch screens,
    });
    $('.collapsible').collapsible();
  }

  onClick() {
    this.props.logout();
    this.props.history.push('/signin');
  }
  toggleSearch() {
    this.setState({ isSearching: !this.state.isSearching });
  }
  render() {
    const { isAuthenticated } = this.props.user;

    const userLinks = (
      <div>
        <ul>
          <li className="hide-on-large-only right" onClick={this.toggleSearch} ><i className="material-icons medium" >search</i></li>
        </ul>
        <ul className="nav-mobile right hide-on-med-and-down">
          <li><NavLink to="/myrecipes" activeClassName="active">My Recipes</NavLink></li>
          <li ><NavLink to="/favorites" activeClassName="active">Favorites</NavLink></li>
          <li><NavLink to="/profile" activeClassName="active"><i className="material-icons large left">account_circle</i>Profile</NavLink></li>
          <li ><a className="btn" onClick={this.onClick.bind(this)}>Logout</a></li>
        </ul>
        <ul className="side-nav" id="more-recipe">
          <li><NavLink to="/myrecipes" activeClassName="active"><i className="fa fa-cutlery prefix" aria-hidden="true" />My Recipes</NavLink></li>
          <li><NavLink to="/favorites" activeClassName="active"><i className="fa fa-heart prefix" aria-hidden="true" />Favorites</NavLink></li>
          <li><NavLink to="/profile" activeClassName="active"><i className="fa fa-user prefix" aria-hidden="true" />Profile</NavLink></li>
          <li ><a className="btn" onClick={this.onClick.bind(this)}>Logout</a></li>
        </ul>
      </div>


    );

    const guestLinks = (
      <div>
        <ul className="side-nav" id="more-recipe">
          <li ><NavLink className="btn" to="/signin"  >Login</NavLink></li>
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
          <div className="nav-background">
            {/* <div className="pattern active" style={"background-image: url('//cdn.shopify.com/s/files/1/2030/2737/files/icon-seamless_ef568d79-394b-49ab-a3c5-128827d788e8.png?v=1496294246');"}></div> */}
          </div>
          <div className="nav-wrapper">
            <div className="container">
              <NavLink to="/" className="brand-logo"><img className="img image-responsive" src="http://res.cloudinary.com/dcmxbxzyj/image/upload/v1508597712/more-recipe-logo3_hssqkb.png" alt="" /></NavLink>
              <NavLink to="" data-activates="more-recipe" className="button-collapse"><i className="material-icons">menu</i></NavLink>

              {isAuthenticated ? userLinks : guestLinks}
            </div>
          </div>
        </nav>
        <div className="container">
          {this.state.isSearching && <SearchForm />}
        </div>

      </div>
    );
  }
}

NavigationBar.propTypes = {
  user: PropTypes.object.isRequired,
  logout: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired

};

function mapStateToProps(state) {
  return {
    user: state.auth
  };
}

export default withRouter(connect(mapStateToProps, { logout })(NavigationBar));
