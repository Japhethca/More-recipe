import React, { Component } from 'react';
import {NavLink} from 'react-router-dom';
import {connect } from 'react-redux';
import PropTypes from 'prop-types';
import {logout} from '../actions/requestHandlers/handleLoginrequest'

class NavigationBar extends Component {
  onClick(e){
    this.props.logout()
    history.push('/login')
  }
  render() {
    const {isAuthenticated} = this.props.user

    const userLinks = (
      <ul className="nav-mobile right hide-on-med-and-down">
        <li><NavLink to='/myrecipes'>My Recipes</NavLink></li>
        <li className=''><a href='#' onClick={this.onClick.bind(this)}>Logout</a></li>
      </ul>
    );

    const guestLinks = (
      <ul className="nav-mobile right hide-on-med-and-down">
        <li><NavLink to='/signin' >Login</NavLink></li>
        <li><NavLink to='/signup'>SignUp</NavLink></li>
      </ul>
    )
    return (
      <div>
        <nav className="nav-wrapper brown">
            <div className="container">
                <NavLink to='/' className="brand-logo">More Recipe</NavLink>
                <NavLink to='' data-activates="mobile-demo" className="button-collapse"><i className="material-icons">menu</i></NavLink>
                {isAuthenticated ? userLinks : guestLinks}
            </div>
        </nav>
      </div>
    )
  }
}

NavigationBar.propTypes = {
  user: PropTypes.object.isRequired,
  logout: PropTypes.func.isRequired
}

function mapStateToProps (state){
  return {
    user: state.auth
  }
}

export default connect(mapStateToProps, {logout})(NavigationBar);