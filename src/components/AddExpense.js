import React, { Component } from 'react';
import CurrencieToAdd from './CurrencieToAdd';
import DescriptionToAdd from './DescriptionToAdd';
import PaymentMethodToAdd from './PaymentMethodToAdd';
import TagToAdd from './TagToAdd';
import ValueToAdd from './ValueToAdd';

class AddExpense extends Component {
  render() {
    return (
      <form className="addExpense">
        <DescriptionToAdd />
        <CurrencieToAdd />
        <PaymentMethodToAdd />
        <TagToAdd />
        <ValueToAdd />
      </form>
    );
  }
}

export default AddExpense;
