import React from 'react';
import PropTypes from 'prop-types';
import TinyMCE from 'react-tinymce';

import '../styles/recipeForm.scss';


const propTypes = {
  recipe: PropTypes.objectOf(PropTypes.any),
  validationErrors: PropTypes.objectOf(PropTypes.arrayOf(PropTypes.string)).isRequired,
  onSubmit: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  handleEditorChange: PropTypes.func.isRequired,
  title: PropTypes.string,
  clearForm: PropTypes.bool.isRequired
};

const RecipeForm = (props) => {
  const editorConfig = {
    menubar: false,
    statusbar: false,
    plugins: 'lists textcolor',
    toolbar: 'bullist numlist | bold italic | strikethrough'
  };

  const clearForm = node => (props.clearForm ? node.clear() : null);

  const renderEditorFor = (inputName, heading, validator) => (
    <div>
      <h5>{heading}</h5>
      { validator && <span className="error-text"> { validator[0] }</span> }
      <TinyMCE
        content={props.recipe[inputName]}
        config={editorConfig}
        onChange={props.handleEditorChange}
        name={inputName}
      />
    </div>
  );

  const renderInputFieldFor = (name, label, validator) => (
    <div>
      <input
        name={name}
        type="text"
        value={props.recipe[name]}
        onChange={props.onChange}
        placeholder={label}
        className="text-field"
      />
      {validator && <span className="error-text"> { validator[0] }</span>}
    </div>);

  const { validationErrors } = props;
  return (
    <div className="wrapper row">
      <div className="card col s12">
        <h4 className="header">{props.title}</h4>
        <form onSubmit={props.onSubmit} ref={node => clearForm(node)}>

          {renderInputFieldFor('name', 'Enter Recipe Name', validationErrors.name)}
          {renderInputFieldFor('description', 'Enter Description', validationErrors.description)}
          {renderEditorFor('ingredients', 'Add Ingredients', validationErrors.ingredients)}
          {renderEditorFor('direction', 'How To Prepare', validationErrors.direction)}

          <hr />
          <div>
            <input type="file" className="input-file" onChange={props.onChange} name="image" accept=".jpg, .jpeg, .png" />
            <img
              id="img1"
              src={props.recipe.image ||
                  'http://res.cloudinary.com/dcmxbxzyj/image/upload/v1511526912/recipe-card-placeholder_ta9ikp.jpg'}
              alt="Recipe"
              className="image-class"
            />
          </div>
          <div className="input-btn">
            <button className="submit-btn waves-effect waves-ripple" type="submit"> Submit </button>
          </div>
        </form>
      </div>
    </div>
  );
};

RecipeForm.propTypes = propTypes;

RecipeForm.defaultProps = {
  recipe: {},
  title: 'Create New Recipe'
};

export default RecipeForm;
