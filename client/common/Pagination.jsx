import React, { Component } from 'react';
import ReactPaginate from 'react-paginate';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { getAllRecipes } from '../home/actions';
import './pagination.scss';

class Pagination extends Component {
  constructor(props) {
    super(props);
    this.state = {
      totalPages: props.pagination.totalPages
    };
  }


  componentWillReceiveProps(nextProps) {
    if (nextProps.pagination !== this.props.pagination) {
      this.setState({ totalPages: nextProps.pagination.totalPages });
    }
  }

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
