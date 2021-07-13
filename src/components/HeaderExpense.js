import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { sendExpense } from '../services/API';
import { updateExpense } from '../actions';
import FormInput from './FormInput';

const setBlank = () => {
  const expensesForm = document.getElementById('expensesForm');
  document.getElementById('valueInput').value = '';
  document.getElementById('currency').value = 'USD';
  document.getElementById('descriptionInput').value = '';
  document.getElementById('paymentMethod').value = 'Dinheiro';
  document.getElementById('tagInput').value = 'Alimentação';
  expensesForm.style.backgroundColor = 'white';
  expensesForm.style.color = 'black';
  expensesForm.removeAttribute('key');
};

export default function HeaderExpense() {
  const walletExpenses = useSelector((state) => state.wallet.expenses);
  const dispatch = useDispatch();
  const handleFormSubmit = (e) => {
    e.preventDefault();
    const { target } = e;
    const data = new FormData(target);
    const formKey = document.getElementById('expensesForm').getAttribute('key');
    const expense = {
      currency: data.get('currency'),
      description: data.get('description'),
      method: data.get('method'),
      tag: data.get('tag'),
      value: data.get('value'),
    };

    return dispatch(sendExpense({ ...expense, id: formKey }));
  };

  const handleUpdateSubmit = () => {
    const submitButton = document.getElementById('submitButton');
    const formKey = document.getElementById('expensesForm').getAttribute('key');
    const valueInput = document.getElementById('valueInput').value;
    const currencyInput = document.getElementById('currency').value;
    const descriptionInput = document.getElementById('descriptionInput').value;
    const methodInput = document.getElementById('paymentMethod').value;
    const tagInput = document.getElementById('tagInput').value;
    const editedEl = walletExpenses.find((el) => el.id === parseInt(formKey, 10));
    const { exchangeRates } = editedEl;

    const expense = {
      description: descriptionInput,
      method: methodInput,
      tag: tagInput,
      value: valueInput,
      currency: currencyInput,
      exchangeRates,
    };
    setBlank();

    submitButton.removeAttribute('disabled');
    return dispatch(updateExpense({ ...expense, id: parseInt(formKey, 10) }));
  };

  return (<FormInput
    handleFormSubmit={ handleFormSubmit }
    onClick={ handleUpdateSubmit }
  />);
}
