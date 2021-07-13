import React from 'react';
import PropTypes from 'prop-types';
import ExtendedRow from './ExtendedRow';

const createObject = (queryObj, id) => {
  const submitButton = document.getElementById('submitButton');
  submitButton.setAttribute('disabled', 'true');
  const expensesForm = document.getElementById('expensesForm');
  document.getElementById('valueInput').value = queryObj.value;
  document.getElementById('currency').value = queryObj.currency;
  document.getElementById('descriptionInput').value = queryObj.description;
  document.getElementById('paymentMethod').value = queryObj.method;
  document.getElementById('tagInput').value = queryObj.tag;
  expensesForm.style.backgroundColor = 'green';
  expensesForm.style.color = 'white';
  expensesForm.setAttribute('key', id);
};

export default function FormInput(props) {
  const { user, handleDelete } = props;
  const { id } = user;

  const handleEdit = (e) => {
    const { target } = e;
    const Row = target.parentNode.parentNode;
    const { childNodes } = Row;
    const queryObj = {};
    childNodes.forEach((el) => {
      const obName = el.getAttribute('name');
      const obValue = el.getAttribute('value');
      if (obName && obValue) {
        queryObj[obName] = obValue;
      }
    });

    createObject(queryObj, id);
  };

  return (<ExtendedRow
    user={ user }
    handleDelete={ handleDelete }
    handleEdit={ handleEdit }
  />);
}

FormInput.propTypes = {
  user: PropTypes.shape({
    description: PropTypes.string,
    method: PropTypes.string,
    tag: PropTypes.string,
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    exchangeRates: PropTypes.objectOf(PropTypes.object),
    currency: PropTypes.string,
    id: PropTypes.number,
  }).isRequired,
  handleDelete: PropTypes.func.isRequired,
};
