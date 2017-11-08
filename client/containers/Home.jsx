import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import NavigationBar from '../components/NavigationBar';
import SearchForm from '../components/SearchForm';
import Footer from '../components/Footer';
import TopRecipes from '../components/recipeComponents/TopRecipe';


class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      favorites: this.props.favorites
    };
  }
  onchange(event) {
    const reader = new FileReader();
    reader.onload = function () {
      const output = document.getElementById('img1');
      output.src = reader.result;
    };
    reader.readAsDataURL(event.target.files[0]);
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
        <SearchForm />
        <TopRecipes history={this.props.history} />
        <Footer />
      </div>
    );
  }
}

Home.propTypes = {
  history: PropTypes.object.isRequired,
};
const mapStateToProps = state => ({
  favorites: state.favorites
});


export default connect(mapStateToProps, {})(Home);
