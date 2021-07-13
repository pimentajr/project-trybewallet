import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Wallet extends React.Component {
  constructor() {
    super();

    this.state = {
      currencies: [],
    };

    this.fetchCurrencies = this.fetchCurrencies.bind(this);
    this.formComponents = this.formComponents.bind(this);
  }

  componentDidMount() {
    this.fetchCurrencies();
  }

  fetchCurrencies() {
    fetch('https://economia.awesomeapi.com.br/json/all').then((res) => res.json())
      .then((res) => Object.keys(res).filter((key) => key !== 'USDT'))
      .then((res) => this.setState({ currencies: res }));
  }

  formComponentValor() {
    return (
      <label htmlFor="valor">
        Valor:&nbsp;
        <input
          type="text"
          id="valor"
        />
      </label>
    );
  }

  formComponentMoeda(currencies) {
    return (
      <label htmlFor="Moeda">
        Moeda:&nbsp;
        <select
          id="Moeda"
        >
          {currencies.map((opt, i) => <option key={ i }>{opt}</option>) }
        </select>
      </label>
    );
  }

  formComponentMetodoPagamento() {
    return (
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
    );
  }

  formComponentTag() {
    return (
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
    );
  }

  formComponentDescricao() {
    return (
      <label htmlFor="Descrição">
        Descrição:&nbsp;
        <input
          type="text"
          id="Descrição"
        />
      </label>
    );
  }

  formComponents() {
    const { currencies } = this.state;

    return (
      <form className="form">
        {this.formComponentValor()}
        {this.formComponentMoeda(currencies)}
        {this.formComponentMetodoPagamento()}
        {this.formComponentTag()}
        {this.formComponentDescricao()}
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
