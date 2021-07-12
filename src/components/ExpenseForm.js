import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class ExpenseForm extends Component {
  constructor() {
    super();
    this.state = {
      value: '',
      description: '',
      coin: 'BRL',
      payment: '',
      tag: '',
    };

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange({ target }) {
    const { name, value } = target;

    this.setState({
      [name]: value,
    });
  }

  createOptions(array) {
    return (
      array.map((string) => <option key={ string } value={ string }>{string}</option>)
    );
  }

  removeUSDT(currency) {
    if (currency !== 'USDT') {
      return currency;
    }
  }

  render() {
    const { currencies } = this.props;
    const { value, description, coin, payment, tag } = this.state;
    const paymentTypes = ['Dinheiro', 'Cartão de crédito', 'Cartão de débito'];
    const tagTypes = ['Alimentação', 'Lazer', 'Trabalho', 'Transporte', 'Saúde'];

    return (
      <form className="expense-form">
        <label htmlFor="v">
          Valor
          <input
            id="v"
            name="value"
            type="number"
            value={ value }
            onChange={ this.handleChange }
          />
        </label>
        <label htmlFor="c">
          Moeda
          <select id="c" name="coin" value={ coin } onChange={ this.handleChange }>
            {this.createOptions(Object.keys(currencies).filter(this.removeUSDT))}
          </select>
        </label>
        <label htmlFor="p">
          Método de pagamento
          <select id="p" name="payment" value={ payment } onChange={ this.handleChange }>
            {this.createOptions(paymentTypes)}
          </select>
        </label>
        <label htmlFor="t">
          Tag
          <select id="t" name="tag" value={ tag } onChange={ this.handleChange }>
            {this.createOptions(tagTypes)}
          </select>
        </label>
        <label htmlFor="d">
          Descrição
          <input
            id="d"
            name="description"
            type="text"
            value={ description }
            onChange={ this.handleChange }
          />
        </label>
      </form>
    );
  }
}

ExpenseForm.propTypes = {
  currencies: PropTypes.arrayOf(
    PropTypes.object,
  ),
}.isRequired;

const mapStateToProps = (state) => ({
  currencies: state.wallet.currencies,
});

export default connect(mapStateToProps)(ExpenseForm);
