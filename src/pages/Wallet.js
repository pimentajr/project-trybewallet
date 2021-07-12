import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Wallet extends React.Component {
  constructor() {
    super();
    this.formComponents = this.formComponents.bind(this);
  }

  formComponents() {
    return (
      <form className="form">
        <label htmlFor="valor">
          Valor:&nbsp;
          <input
            type="text"
            id="valor"
          />
        </label>
        <label htmlFor="Moeda">
          Moeda:&nbsp;
          <select
            id="Moeda"
          >
            <option>Vazio</option>
          </select>
        </label>
        <label htmlFor="Método de pagamento">
          Método de pagamento:&nbsp;
          <select
            id="Método de pagamento"
          >
            <option>Dinheiro</option>
            <option>Cartão de crédito</option>
            <option>Cartão de débito</option>
          </select>
        </label>
        <label htmlFor="Tag">
          Tag:&nbsp;
          <select
            id="Tag"
          >
            <option>Alimentação</option>
            <option>Lazer</option>
            <option>Trabalho</option>
            <option>Transporte</option>
            <option>Saúde</option>
          </select>
        </label>
        <label htmlFor="Descrição">
          Descrição:&nbsp;
          <input
            type="text"
            id="Descrição"
          />
        </label>
      </form>
    );
  }

  render() {
    const { getLogin } = this.props;
    const TOTAL_INIT_VALUE = 0; // remover depois
    const CAMBIO_INIT_VALUE = 'BRL'; // remover depois
    return (
      <div>
        <div className="walletHeader">
          <h3>TrybeWallet</h3>
          <div className="walletHeaderRight">
            <span className="email" data-testid="email-field">
              { getLogin }
            </span>
            <span className="total" data-testid="total-field">
              Total: &nbsp;
              { TOTAL_INIT_VALUE }
            </span>
            <span data-testid="header-currency-field">
              { CAMBIO_INIT_VALUE }
            </span>
          </div>
        </div>
        {this.formComponents()}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  getLogin: state.user.email,
});

Wallet.propTypes = {
  getLogin: PropTypes.string.isRequired,
};

export default connect(mapStateToProps)(Wallet);
