import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchCurrencies } from '../actions';

class Wallet extends React.Component {
  constructor() {
    super();

    this.state = {
      currencies: ['BRL', 'USD'],
    };

    this.getCurrencies = this.getCurrencies.bind(this);
  }

  componentDidMount() {
    this.getCurrencies();
  }

  async getCurrencies() {
    const { fetchCurrency } = this.props;
    try {
      await fetchCurrency();
      const { currency } = this.props;
      this.setState({ currencies: currency });
    } catch (error) {
      return console.log(error);
    }
  }

  render() {
    const { email } = this.props;
    const { currencies } = this.state;
    return (
      <div>
        <p data-testid="email-field">{ email }</p>
        <p data-testid="total-field">0</p>
        <select data-testid="header-currency-field">
          <option>BRL</option>
        </select>
        <form>
          <label htmlFor="expenseInput">
            Valor
            <input type="number" name="expense" id="expenseInput" />
          </label>
          <label htmlFor="expenseDescription">
            Descrição
            <textarea id="expenseDescription" />
          </label>
          <label htmlFor="currency">
            Moeda
            <select id="currency">
              { currencies.map((crncy, index) => <option key={ index }>{crncy}</option>) }
            </select>
          </label>
          <label htmlFor="payment-method">
            Método de pagamento
            <select id="payment-method">
              <option>Dinheiro</option>
              <option>Cartão de crédito</option>
              <option>Cartão de débito</option>
            </select>
          </label>
          <label htmlFor="tag">
            Tag
            <select id="tag">
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
Wallet.propTypes = {
  email: PropTypes.string.isRequired,
  currency: PropTypes.objectOf().isRequired,
  fetchCurrency: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  email: state.user.email,
  currency: state.wallet.currencies,
});

const mapDispatchToProps = (dispatch) => ({
  fetchCurrency: () => dispatch(fetchCurrencies()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Wallet);
