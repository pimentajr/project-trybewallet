import { connect } from 'react-redux';
import React from 'react';
import PropTypes from 'prop-types';

class Wallet extends React.Component {
  render() {
    const { email } = this.props;
    return (
      <div>
        <header>
          <p data-testid="email-field">{email}</p>
          <p data-testid="total-field"> 0 </p>
          <p data-testid="header-currency-field"> BRL </p>
        </header>
        <form>
          <label htmlFor="input-value">
            Valor
            <input id="input-value" type="text" />
          </label>
          <label htmlFor="description">
            Descrição
            <input id="description" type="text" />
          </label>
          <label htmlFor="currency">
            Moeda
            <select role="combobox" id="currency">
              <option value="dindin">Dindin</option>
            </select>
          </label>
          <label htmlFor="payment-method">
            Método de Pagamento
            <select role="combobox" id="payment-method">
              <option value="money"> Dinheiro</option>
              <option value="credit-card">Cartão de crédito</option>
              <option value="debit-card">Cartão de débito</option>
            </select>
          </label>
          <label htmlFor="tag">
            Tag
            <select role="combobox" id="tag">
              <option value="food">Alimentação</option>
              <option value="laze">Lazer</option>
              <option value="work">Trabalho</option>
              <option value="Transport">Transporte</option>
              <option value="health">Saúde</option>
            </select>
          </label>
        </form>
      </div>
    );
  }
}
const mapStateToProps = (state) => ({
  email: state.user.email,
});
Wallet.propTypes = {
  email: PropTypes.string.isRequired,
};
export default connect(mapStateToProps)(Wallet);
