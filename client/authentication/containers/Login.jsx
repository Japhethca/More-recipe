import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';


import { handleAuthRequest } from '../actions';
import { signinValidator } from '../../utilities/validators';
import LoginForm from '../components/LoginForm';

/**
 * @class Login
 * @extends {Component}
 */
class Login extends Component {
  /**
   * Creates an instance of Login.
   * @param {object} props - react props
   * @memberof Login
   */
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      serverErrors: this.props.authentication.errors,
      validationErrors: {},
    };
  }

  /**
   * @param {object} nextProps
   * @memberof Login
   * @returns {undefined}
   */
  componentWillReceiveProps(nextProps) {
    if (nextProps.authentication.errors !== null) {
      this.setState({ serverErrors: nextProps.authentication.errors });
    }
  }

  /**
   * handles input change events
   * @param {SyntheticEvent} event - onchange event
   * @memberof Login
   * @returns {undefined}
   */
  onChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
    this.isValid();
  }

  /**
   * handles form submission
   * @param {SyntheticEvent} event - onsubmit event
   * @memberof Login
   * @returns {undefined}
   */
  onSubmit = (event) => {
    event.preventDefault();
    if (this.isValid()) {
      this.props.handleAuthRequest(this.state, 'login');
    }
  }

  /**
   *
   * checks if form values are valid
   * @memberof Login
   * @returns {Boolean} - return true/false
   */
  isValid = () => {
    const { errors, isValid } = signinValidator(this.state);
    if (!isValid) {
      this.setState({ validationErrors: errors });
    } else {
      this.setState({ validationErrors: {} });
    }
    return isValid;
  }

  /**
   *
   *
   * @memberof Login
   * @returns {ReactElement} markup
   */
  render() {
    const formData = { email: this.state.email, password: this.state.password };

    if (this.props.authentication.isAuthenticated) {
      this.props.history.push('/recipes');
    }

    return (
      <div>
        <LoginForm
          onChange={this.onChange}
          onSubmit={this.onSubmit}
          formData={formData}
          serverErrors={this.state.serverErrors}
          validationErrors={this.state.validationErrors}
        />
      </div>
    );
  }
}

Login.propTypes = {
  authentication: PropTypes.objectOf(PropTypes.any).isRequired,
  handleAuthRequest: PropTypes.func.isRequired,
  history: PropTypes.objectOf(PropTypes.any).isRequired
};

const mapStateToProps = state => ({
  authentication: state.auth
});


export default connect(mapStateToProps, { handleAuthRequest })(Login);
