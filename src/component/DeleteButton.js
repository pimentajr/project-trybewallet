import React from 'react';
import PropTypes from 'prop-types';

function DeleteButton({ onClick }) {
  return (
    <button
      type="button"
      data-testid="delete-btn"
      onClick={ onClick }
    >
      Deletar
    </button>
  );
}

DeleteButton.propTypes = {
  onClick: PropTypes.func.isRequired,
};

export default DeleteButton;
