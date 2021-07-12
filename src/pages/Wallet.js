import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Wallet extends Component {
  form() {
    return (
      <form>
        <label htmlFor="value">
          Valor:
          <input type="text" name="value" />
        </label>
        <label htmlFor="coin">
          Moeda:
          <select name="coin" id="coin">
            vazio
          </select>
        </label>
        <label htmlFor="payment-method">
          Método de Pagamento:
          <select name="payment" id="payment-method">
            <option value="dinheiro">Dinheiro</option>
            <option value="debito">Cartão de Débito</option>
            <option value="credito">Cartão de Crédito</option>
          </select>
        </label>
        <label htmlFor="category">
          Tag
          <select name="category" id="category">
            <option value="lazer">Lazer</option>
            <option value="trabalho">Trabalho</option>
            <option value="alimentacao">Alimentação</option>
            <option value="saude">Saúde</option>
            <option value="transporte">Transporte</option>
          </select>
        </label>
        <label htmlFor="description">
          Descrição:
          <input type="text" name="description" />
        </label>
      </form>
    );
  }

  render() {
    const { email, total } = this.props;
    return (
      <header>
        <p>
          <span>Email: </span>
          <span data-testid="email-field">{ email }</span>
        </p>
        <p>
          <span>Total expense: </span>
          <span data-testid="total-field">{ total || '0' }</span>
          <span data-testid="header-currency-field">BRL</span>
        </p>
        { this.form() }
      </header>
    );
  }
}

const mapStateToProps = (state) => ({
  email: state.user.email,
  total: state.wallet.total,
});

Wallet.propTypes = {
  email: PropTypes.string,
  total: PropTypes.number,
}.isRequired;

export default connect(mapStateToProps)(Wallet);
