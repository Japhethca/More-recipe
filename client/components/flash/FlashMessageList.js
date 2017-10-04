import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import FlashMessage from './FlassMessage';


class FlashMessageList extends Component {
  

  render() {
   
    return (
      <div>
        { this.props.messages.map((message) => 
         <FlashMessage key={1} message = {this.props.messages} />)
        }
      </div>
    )
  }
}

FlashMessageList.propTypes = {
  messages: PropTypes.array.isRequired,
}

function mapStateToProps(state){
  return {
    messages: state.flashMessages
  }
}


export default connect(mapStateToProps,{})(FlashMessageList);
