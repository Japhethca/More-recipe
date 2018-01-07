import React, { Component } from 'react';
import ReactPaginate from 'react-paginate';
import PropTypes from 'prop-types';

import './pagination.scss';


/**
 * @description Pagination
 * @class Pagination
 * @extends {Component}
 */
class Pagination extends Component {
  /**
   * @description Creates an instance of Pagination.
   * @param {object} props
   * @memberof Pagination
   */
  constructor(props) {
    super(props);
    this.state = {
      totalPages: this.props.totalPages,
      currentPage: this.props.currentPage
    };
  }

  /**
   * @description checks if pagination state is available
   * @param {object} nextProps
   * @memberof Pagination
   * @returns {undefined}
   */
  componentWillReceiveProps(nextProps) {
    if (nextProps.totalPages !== this.props.totalPages) {
      this.setState({ totalPages: nextProps.totalPages });
    }
    if (nextProps.currentPage !== this.props.currentPage) {
      this.setState({ currentPage: nextProps.currentPage });
    }
  }


  /**
   * @description displays pagination
   * @returns {ReactElement} markup
   */
  render() {
    return (
      <div>
        {
          this.state.totalPages > 1 &&
          <ReactPaginate
            pageCount={this.state.totalPages}
            pageRangeDisplayed={4}
            marginPagesDisplayed={1}
            forcePage={this.state.currentPage}
            onPageChange={this.props.handlePagination}
            containerClassName="pag-list"
            pageClassName="page-class"
            pageLinkClassName="link"
            activeClassName="active-page"
            previousClassName="next-prev"
            nextClassName="next-prev"
          />
        }
      </div>
    );
  }
}

Pagination.propTypes = {
  totalPages: PropTypes.number.isRequired,
  currentPage: PropTypes.number.isRequired,
  handlePagination: PropTypes.func.isRequired
};


export default Pagination;
