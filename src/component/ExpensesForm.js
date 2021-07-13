import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class ExpensesForm extends Component {
  render() {
    const { currencies } = this.props;
    const currenciesType = (currencies.map((coins) => Object.values(coins)
      .filter((item) => item.codein !== 'BRLT')
      .map(
        (element) => <option key={ element.code }>{element.code}</option>,
      )));
    return (
      <form>
        <label htmlFor="input-value">
          Valor:
          <input type="number" id="input-value" required />
        </label>
        <label htmlFor="input-description">
          Descrição:
          <input type="text" id="input-description" required />
        </label>
        <label htmlFor="select-currency">
          Moedas
          <select id="select-currency">
            {currenciesType}
          </select>
        </label>
        <label htmlFor="payment-method">
          Método de pagamento:
          <select id="payment-method">
            <option>Cartão de crédito</option>
            <option>Cartão de débito</option>
            <option>Dinheiro</option>
          </select>
        </label>
        <label htmlFor="expenses-type">
          Tag:
          <select id="expenses-type">
            <option>Alimentação</option>
            <option>Lazer</option>
            <option>Trabalho</option>
            <option>Transporte</option>
            <option>Saúde</option>
          </select>
        </label>
      </form>
    );
  }
}

const mapStateToProps = (state) => ({
  currencies: state.wallet.currencies,
});

ExpensesForm.propTypes = {
  currencies: PropTypes.arrayOf(Object).isRequired,
};

export default connect(mapStateToProps)(ExpensesForm);
