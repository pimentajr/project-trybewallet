import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import TextInput from './TextInput';
import SelectInput from './SelectInput';
import currencyTypeFilter from '../helpers/currencyTypeFilter';

class ExpensesForm extends Component {
  render() {
    const paymentOptions = ['Dinheiro', 'Cartão de crédito', 'Cartão de débito'];
    const { currencies } = this.props;
    const filteredCurrencies = currencyTypeFilter(currencies);
    const tags = ['Alimentação', 'Lazer', 'Trabalho', 'Transporte', 'Saúde'];
    return (
      <form className="expensesForm">
        <TextInput label="Valor" />
        <TextInput label="Descrição" />

        <SelectInput label="Moeda" options={ filteredCurrencies } />
        <SelectInput label="Método de pagamento" options={ paymentOptions } />
        <SelectInput label="Tag" options={ tags } />

      </form>
    );
  }
}

const mapStateToProps = (state) => ({
  currencies: state.wallet.currencies,
});

export default connect(mapStateToProps, null)(ExpensesForm);

ExpensesForm.propTypes = {
  currencies: PropTypes.objectOf(PropTypes.object).isRequired,
};
