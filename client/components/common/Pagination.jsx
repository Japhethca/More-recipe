import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import _ from 'lodash';
import { Link } from 'react-router-dom';

const propTypes = {
  pagination: PropTypes.objectOf(PropTypes.number).isRequired,
  baseURL: PropTypes.string.isRequired
};
class Pagination extends Component {
  constructor(props) {
    super(props);
    this.state = {
      baseURL: this.props.baseURL,
      limit: this.props.pagination.limit || 3,
      pages: []
    };
  }


  componentWillReceiveProps(nextProps) {
    if (nextProps !== this.props) {
      this.setState({
        pages: _.range(Math.ceil(this.props.pagination.count / this.state.limit))
      });
    }
  }

  renderPaginationLinks = () => this.state.pages.map((page, index) => {
    let currentClass = 'waves-effect';
    if (!this.props.pagination.page && (index + 1) === 1) {
      currentClass = 'active';
    }
    if (this.props.pagination.page === (index + 1)) {
      currentClass = 'active';
    }
    return (
      <li
        className={currentClass}
        id={index + 1}
        key={page + Date()}
      >
        <Link
          to={`${this.state.baseURL}?page=${index + 1}`}
          href={`?page=${index + 1}`}
        >{index + 1}
        </Link>
      </li>
    );
  })

  render() {
    return (
      <ul className="pagination">
        <li className="disabled"><i className="material-icons">chevron_left</i></li>
        {this.state.limit && this.renderPaginationLinks()}
        <li className="disabled"><i className="material-icons">chevron_right</i></li>
      </ul>
    );
  }
}

Pagination.propTypes = propTypes;
const mapStateToProps = state => ({
  pagination: state.pagination
});

export default connect(mapStateToProps, null)(Pagination);
