import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import {connect } from 'react-redux';
import PropTypes from 'prop-types';
import {logout} from '../actions/requestHandlers/handleLoginrequest'

class NavigationBar extends Component {
  onClick(e){
    this.props.logout()
  }
  render() {
    const {isAuthenticated} = this.props.user

    const userLinks = (
      <ul className="nav-mobile right hide-on-med-and-down">
        <li><a href='#' onClick={this.onClick.bind(this)}>Logout</a></li>
      </ul>
    );

    const guestLinks = (
      <ul className="nav-mobile right hide-on-med-and-down">
        <li><Link to='/signin' >Login</Link></li>
        <li><Link to='/signup'>SignUp</Link></li>
      </ul>
    )
    return (
      <div>
        <nav className="nav-wrapper brown">
            <div className="container">
                <Link to='/' className="brand-logo">More Recipe</Link>
                <Link to='' data-activates="mobile-demo" className="button-collapse"><i className="material-icons">menu</i></Link>
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