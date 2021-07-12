import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Head from '../components/WalletHeader';

class Wallet extends React.Component {
  render() {
    const { email } = this.props;
    return (
      <div>
        <Head email={ email } />
        <form>
          <label htmlFor="valor">
            Valor
            <input type="number" name="valor" />
          </label>
          <label htmlFor="description">
            Descrição
            <input type="text" name="description" />
          </label>
          <label htmlFor="coin">
            Moeda
            <select>
              <option id="coin" value="laranja">Laranja</option>
            </select>
          </label>
          <label htmlFor="payment">
            Método de pagamento
            <select id="payment">
              <option value="Dinheiro">Dinheiro</option>
              <option value="Cartão de crédito">Cartão de crédito</option>
              <option value="Cartão de débito">Cartão de débito</option>
            </select>
          </label>
          <label htmlFor="category">
            Tag
            <select id="category" name="tag">
              <option>Alimentação</option>
              <option>Lazer</option>
              <option>Trabalho</option>
              <option>Transporte</option>
              <option>Saúde</option>
            </select>
          </label>
          <button type="button">Adicionar Despesa</button>
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
