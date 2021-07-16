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
          <label htmlFor="descrição">
            Descrição
            <input id="descrição" type="text" />
          </label>
          <label htmlFor="currency">
            Moeda
            <select role="combobox" id="currency">
              <option value="dinheiro">Dinheiro</option>
            </select>
          </label>
          <label htmlFor="metodo-de-pagamento">
            Método de Pagamento
            <select role="combobox" id="payment-method">
              <option value="dinheiro"> Dinheiro</option>
              <option value="cartao-de-credito">Cartão de crédito</option>
              <option value="cartao-de-debito">Cartão de débito</option>
            </select>
          </label>
          <label htmlFor="tag">
            Tag
            <select role="combobox" id="tag">
              <option value="alimentação">Alimentação</option>
              <option value="lazer">Lazer</option>
              <option value="trabalho">Trabalho</option>
              <option value="transporte">Transporte</option>
              <option value="saude">Saúde</option>
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
