import React from 'react';
import PropTypes from 'prop-types';
import { GlobalContext } from '../GlobalContext';

function Input({ label, type, name }) {
  const { providerValues } = React.useContext(GlobalContext);

  function handleChange({ target }) {
    providerValues.setValue(target.value);
  }

  return (
    <div>
      <label htmlFor={ name }>
        {label}
      </label>
      <input
        id={ name }
        name={ name }
        type={ type }
        onChange={ handleChange }
      />
    </div>
  );
}

Input.propTypes = {
  label: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
};

export default Input;
