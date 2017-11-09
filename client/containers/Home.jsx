import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import NavigationBar from '../components/navigation/NavigationBar';
import Footer from '../components//navigation/Footer';
import Recipes from '../components/recipe/Recipes';


const propTypes = {
  history: PropTypes.object.isRequired,
};

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      favorites: this.props.favorites
    };
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.favorites !== nextProps.favorites) {
      this.setState({ favorites: nextProps.favorites });
    }
  }
  render() {
    return (
      <div id="main">
        <NavigationBar />
        <Recipes
          history={this.props.history}
        />
        <Footer />
      </div>
    );
  }
}

Home.propTypes = propTypes;

const mapStateToProps = state => ({
  favorites: state.favorites
});

export default connect(mapStateToProps, {})(Home);
