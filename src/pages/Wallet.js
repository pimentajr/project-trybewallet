import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Wallet extends Component {
  form() {
    return (
      <form>
        <label htmlFor="value">
          Value:
          <input type="text" name="value" />
        </label>
        <label htmlFor="currency">
          Currency:
          <select name="coin" id="coin">
            Vazio
          </select>
        </label>
        <label htmlFor="payment-method">
          Payement method:
          <select name="payment" id="payment-method">
            <option value="dinheiro">Cash</option>
            <option value="credito">Credit Card</option>
            <option value="debito">Debit Card</option>
          </select>
        </label>
        <label htmlFor="category">
          Tag
          <select name="category" id="category">
            <option value="lazer">Vacations</option>
            <option value="trabalho">Work</option>
            <option value="Alimentacao">Food</option>
            <option value="saude">Health</option>
            <option value="transporte">Transport</option>
          </select>
        </label>
        <label htmlFor="description">
          Description:
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
