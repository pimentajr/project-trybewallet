/* eslint-disable max-lines-per-function */
import React from 'react';
import PropTypes from 'prop-types';
import TagSelect from './TagSelect';
import PaymentSelect from './PaymentSelect';
import Description from './Description';
import ValueInput from './ValueInput';
import CurrencyInput from './CurrencyInput';

export default function FormInput(props) {
  const { handleFormSubmit, onClick } = props;
  return (
    <form
      id="expensesForm"
      className="d-flex justify-content-between border p-2"
      onSubmit={ handleFormSubmit }
    >
      <ValueInput />
      <CurrencyInput />
      <PaymentSelect />
      <TagSelect />
      <Description />
      <button
        id="submitButton"
        type="submit"
        className="btn btn-primary"
      >
        Adicionar despesa
      </button>
      <button
        onClick={ onClick }
        id="updateButton"
        type="button"
        className="btn btn-primary"
      >
        Editar despesa
      </button>

    </form>
  );
}

FormInput.propTypes = {
  handleFormSubmit: PropTypes.func.isRequired,
  onClick: PropTypes.func.isRequired,
};
