import React, { Component } from 'react';
import {NavLink, withRouter} from 'react-router-dom';
import {connect } from 'react-redux';
import PropTypes from 'prop-types';
import FlashMessage from '../components/flash/FlassMessage'
import {logout} from '../actions/requestHandlers/handleLoginrequest';

class NavigationBar extends Component {
  constructor(props){
    super(props);
  }

  onClick(e){
    this.props.logout()
    this.props.history.push('/signin')
  }

  render() {
    const {isAuthenticated} = this.props.user;

    const userLinks = (
      <div>
        <ul className="nav-mobile right hide-on-med-and-down">
          <li><NavLink to='/myrecipes'>My Recipes</NavLink></li>
          <li><NavLink to='/favorites'>Favorites</NavLink></li>
          <li><NavLink to='/profile'><i className='material-icons large left'>account_circle</i>Profile</NavLink></li>
          <li className=''><a href='#' onClick={this.onClick.bind(this)}>Logout</a></li>
        </ul>
        <ul className='side-nav' id='more-recipe'>
          <li>testing</li>
        </ul>
      </div>
      
    );

    const guestLinks = (
      <div>
        <ul className="nav-mobile right hide-on-med-and-down">
          <li><NavLink to='/signin' >Login</NavLink></li>
          <li><NavLink to='/signup'>SignUp</NavLink></li>
        </ul>
        <ul className='side-nav' id='more-recipe'>
          <li>testing</li>
        </ul>
      </div>
      
    )
    return (
      <div>
        <nav className="nav-wrapper brown darken-4">
            <div className="container">
                <NavLink to='/' className="brand-logo">More Recipe</NavLink>
                <NavLink to='' data-activates="more-recipe" className="button-collapse"><i className="material-icons">menu</i></NavLink>
                {isAuthenticated ? userLinks : guestLinks}
            </div>
        </nav>
        <FlashMessage />
      </div>
    )
  }
}

NavigationBar.propTypes = {
  user: PropTypes.object.isRequired,
  logout: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired
  
}

function mapStateToProps (state){
  return {
    user: state.auth
  }
}

export default withRouter(connect(mapStateToProps, {logout})(NavigationBar));