import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import * as currenciesActions from '../actions/index';

class Wallet extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      totalExpense: 0,
      currentCurrency: 'BRL',
      shouldRenderForm: false,
    };
    this.showCurrencies = this.showCurrencies.bind(this);
  }

  componentDidMount() {
    this.showCurrencies();
  }

  showCurrencies() {
    const { getCurrencies } = this.props;
    getCurrencies();
    this.setState({ shouldRenderForm: true });
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
    const { currencies } = this.props;
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
            { Object.keys(currencies).map((currency) => {
              if (currency !== 'USDT' && currency !== 'DOGE') {
                return (
                  <option key={ currency } value={ currency }>{ currency }</option>
                );
              } return null;
            }) }
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
    const { shouldRenderForm } = this.state;
    return (
      <div>
        <span>{ this.renderHeader() }</span>
        <span>{ !shouldRenderForm ? <p>Carregando...</p> : this.renderForm() }</span>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  userEmail: state.user.email,
  currencies: state.wallet.currencies,
});

const mapDispatchToProps = (dispatch) => ({
  getCurrencies: () => { dispatch(currenciesActions.getCurrencies()); },
});

Wallet.propTypes = {
  userEmail: PropTypes.string.isRequired,
  getCurrencies: PropTypes.func.isRequired,
  currencies: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Wallet);
