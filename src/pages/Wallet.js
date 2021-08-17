import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Wallet extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      totalExpense: 0,
      currentCurrency: 'BRL',
    };
  }

  renderHeader() {
    const { userEmail } = this.props;
    const { totalExpense, currentCurrency } = this.state;
    return (
      <header>
        <p data-testid="email-field">
          Email:
          { userEmail }
        </p>
        <p data-testid="total-field">
          Despesa Total:
          { totalExpense }
        </p>
        <p data-testid="header-currency-field">
          Câmbio Atual:
          { currentCurrency }
        </p>
      </header>
    );
  }

  renderForm() {
    return (
      <form>
        <label htmlFor="value">
          Valor :
          <input id="value" type="text" name="valor" />
        </label>
        <br />
        <label htmlFor="description">
          Descrição :
          <textarea id="description" type="text" name="description" />
        </label>
        <br />
        <label htmlFor="moeda">
          Moeda :
          <select id="moeda">
            <option>BRL</option>
            <option>USD</option>
          </select>
        </label>
        <br />
        <label htmlFor="pagamento">
          Método de pagamento :
          <select id="pagamento">
            <option>Dinheiro</option>
            <option>Cartão de crédito</option>
            <option>Cartão de débito</option>
          </select>
        </label>
        <br />
        <label htmlFor="tag">
          Tag :
          <select id="tag">
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

  render() {
    return (
      <div>
        <span>{ this.renderHeader() }</span>
        <span>{ this.renderForm() }</span>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  userEmail: state.user.email,
});

Wallet.propTypes = {
  userEmail: PropTypes.string.isRequired,
};

export default connect(mapStateToProps)(Wallet);
