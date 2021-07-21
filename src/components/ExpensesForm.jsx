import React, { Component } from 'react';
// import PropTypes from 'prop-types';
import TextInput from './TextInput';
import SelectInput from './SelectInput';

class ExpensesForm extends Component {
  render() {
    const paymentOptions = ['Dinheiro', 'Cartão de crédito', 'Cartão de débito'];
    const currencies = [];
    const tags = ['Alimentação', 'Lazer', 'Trabalho', 'Transporte', 'Saúde'];
    return (
      <form className="expensesForm">
        <TextInput label="Valor" />
        <TextInput label="Descrição" />

        <SelectInput label="Moeda" options={ currencies } />
        <SelectInput label="Método de pagamento" options={ paymentOptions } />
        <SelectInput label="Tag" options={ tags } />

      </form>
    );
  }
}

export default ExpensesForm;
