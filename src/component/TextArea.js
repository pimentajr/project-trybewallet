import React from 'react';
import PropTypes from 'prop-types';
import { GlobalContext } from '../GlobalContext';

function Textarea({ label, name }) {
  const { providerValues } = React.useContext(GlobalContext);

  function handleChange({ target }) {
    providerValues.setDescription(target.value);
  }

  return (
    <div>
      <label htmlFor={ name }>
        {label}
      </label>
      <textarea
        id={ name }
        name={ name }
        onChange={ handleChange }
      />
    </div>
  );
}

Textarea.propTypes = {
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
};

export default Textarea;
