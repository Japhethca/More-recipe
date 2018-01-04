import React, { Component } from 'react';
import ReactPaginate from 'react-paginate';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { getAllRecipes } from '../home/actions';
import './pagination.scss';


/**
 * @class Pagination
 * @extends {Component}
 */
class Pagination extends Component {
  /**
   * Creates an instance of Pagination.
   * @param {object} props
   * @memberof Pagination
   */
  constructor(props) {
    super(props);
    this.state = {
      totalPages: props.pagination.totalPages
    };
  }

  /**
   * @param {object} nextProps
   * @memberof Pagination
   * @returns {undefined}
   */
  componentWillReceiveProps(nextProps) {
    if (nextProps.pagination !== this.props.pagination) {
      this.setState({ totalPages: nextProps.pagination.totalPages });
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
  pagination: PropTypes.objectOf(PropTypes.number).isRequired,
  handlePagination: PropTypes.func.isRequired
};
const mapStateToProps = state => ({
  pagination: state.recipeReducer.pagination
});

export default connect(mapStateToProps, { getAllRecipes })(Pagination);
