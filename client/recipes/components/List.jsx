import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import '../styles/recipesStyles.scss';


/**
 * @param {Object}  recipes, title }
 * @returns {ReactElement} html markup
 */
const List = ({ recipes, title }) => {
  const renderItem = recipe => (
    <li className="list-item">
      <img src={recipe.image} alt="" />
      <Link
        to={`/recipe/${recipe.name}-${recipe.id}`}
        href={`/recipe/${recipe.name}-${recipe.id}`}
      > {recipe.name}
      </Link>
    </li>
  );

  return (
    <div className="list">
      {title}
      {recipes.map(recipe => <ul>{renderItem(recipe)}</ul>)}
    </div>
  );
};


List.propTypes = {
  recipes: PropTypes.arrayOf(PropTypes.any).isRequired,
  title: PropTypes.string
};

List.defaultProps = {
  title: 'Top Recipes'
};

export default List;
