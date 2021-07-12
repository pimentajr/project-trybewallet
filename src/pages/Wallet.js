import React from 'react';
import '../styles/Wallet.css';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { fetchApiCurrencies } from '../actions';

class Wallet extends React.Component {
  constructor() {
    super();
    this.state = {
    };

    this.handleChange = this.handleChange.bind(this);
    this.renderCoinCurrencies = this.renderCoinCurrencies.bind(this);
  }

  componentDidMount() {
    const { fetchAPI } = this.props;
    fetchAPI();
  }

  handleChange({ target }) {
    const { name, value } = target;
    this.setState({
      [name]: value,
    }, () => this.LoginVerification());
  }

  renderCoinCurrencies() {
    const { currencies } = this.props;
    return (
      <label htmlFor="moeda">
        Moeda
        <select
          name="moeda"
          id="moeda"
          onChange={ () => this.handleChange() }
        >
          {currencies.map((currency, index) => (
            <option key={ index }>{currency}</option>
          ))}
        </select>
      </label>
    );
  }

  render() {
    const { email } = this.props;
    return (
      <div className="page">
        <header className="header">
          <p data-testid="email-field">{ email }</p>
          <p data-testid="total-field">{ `Despesa Total: $ ${0} ` }</p>
          <p data-testid="header-currency-field">BRL</p>
        </header>

        <form className="form">
          <label htmlFor="expenses-input">
            Valor:
            <input id="expenses-input" />
          </label>

          <label htmlFor="expenses-description">
            Descrição:
            <textarea id="expenses-description" />
          </label>

          {this.renderCoinCurrencies()}

          <label htmlFor="payment-method-input">
            Método de pagamento:
            <select id="payment-method-input">
              <option>Dinheiro</option>
              <option>Cartão de crédito</option>
              <option>Cartão de débito</option>
            </select>
          </label>

          <label htmlFor="tags-input">
            tag:
            <select id="tags-input">
              <option>Alimentação</option>
              <option>Lazer</option>
              <option>Trabalho</option>
              <option>Transporte</option>
              <option>Saúde</option>
            </select>
          </label>

        </form>
      </div>
    );
  }
}

// Função responsável por mapear a store, e colocar um state dentro da prop email.
// Neste caso quero o state do email de meu reducer user.
const mapStateToProps = (state) => ({
  email: state.user.email,
  currencies: state.wallet.currencies,
  expenses: state.wallet.expenses,
});

// Função responsável por pegar a action e colocar dentro de uma prop para o componente.
// Para que dessa prop o dispatch possa ser acionado.
const mapDispatchToProps = (dispatch) => ({
  fetchAPI: () => dispatch(fetchApiCurrencies()),
});

Wallet.propTypes = {
  email: PropTypes.string.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Wallet);

// TODO Ja configurei as actions e reducers, falta fazer o MAP no wallet.js.
