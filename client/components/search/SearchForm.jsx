import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './search.scss';


const propTypes = {
  history: PropTypes.objectOf(PropTypes.any).isRequired,
};

class SearchForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      query: '',
    };
    this.onSubmit = this.onSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  onChange(e) {
    this.setState({ query: e.target.value });
  }

  onSubmit(e) {
    e.preventDefault();
    this.props.history.push(`/search/${this.state.query}`);
  }

  render() {
    return (
      <div className="search">
        <form
          className="row"
          onSubmit={this.onSubmit}
        >
          <div className="input-field col s9 m9 l9 search-input">
            <input
              id="search"
              type="search"
              required
              placeholder="search for recipe"
              onChange={this.onChange}
            />
          </div>
          <div className="input-field col s3 m3 l3 search-btn" >
            <button><i className="material-icons">search</i></button>
          </div>
        </form>
      </div>
    );
  }
}

SearchForm.propTypes = propTypes;

export default SearchForm;
