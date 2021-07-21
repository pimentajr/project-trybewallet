import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import EntryForm from '../components/EntryForm';
import TableBody from '../components/TableBody';
import TableHeader from '../components/TableHeader';
import { fetchApi, setUserData } from '../actions';

class Wallet extends React.Component {
  constructor() {
    super();
    this.state = {
      paymentMethod: 'Dinheiro',
      currency: 'USD',
      value: 0,
      tag: 'Alimentação',
      id: 0,
    };

    this.requestCurrenciesApi = this.requestCurrenciesApi.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleTotalExpensesSection = this.handleTotalExpensesSection.bind(this);
  }

  componentDidMount() {
    this.requestCurrenciesApi();
  }

  handleChange({ target: { name, value } }) {
    this.setState({
      [name]: value,
    });
  }

  handleTotalExpensesSection() {
    const { expenses } = this.props;

    if (expenses.length !== 0) {
      const totalCost = expenses.reduce((total, expense) => (
        total + expense.value * expense.exchangeRates[expense.currency].ask), 0);
      return totalCost.toFixed(2);
    }
    return 0;
  }

  handleSubmit(event) {
    event.preventDefault();
    const { exchangeRates, setData, fetch } = this.props;
    const {
      paymentMethod,
      description,
      currency,
      value,
      tag,
      id,
    } = this.state;

    fetch();

    const userData = {
      method: paymentMethod,
      description,
      currency,
      value,
      tag,
      id,
      exchangeRates,
    };

    setData(userData);

    const counter = id + 1;
    this.setState({ id: counter });
  }

  requestCurrenciesApi() {
    const { fetch } = this.props;
    fetch();
  }

  render() {
    const { email } = this.props;
    const {
      paymentMethod,
      description,
      currency,
      value,
      tag,
    } = this.state;
    return (
      <div>
        <header>
          <h1>TrybeWallet</h1>
          <strong data-testid="email-field">{`Email: ${email}`}</strong>
          <section className="currency-section">
            <strong>Despesa total: </strong>
            <strong
              data-testid="total-field"
            >
              {this.handleTotalExpensesSection()}
            </strong>
            <strong data-testid="header-currency-field">BRL</strong>
          </section>
        </header>
        <main>
          <EntryForm
            handleChange={ (event) => this.handleChange(event) }
            handleSubmit={ (event) => this.handleSubmit(event) }
            paymentMethod={ paymentMethod }
            description={ description }
            currency={ currency }
            value={ value }
            tag={ tag }
          />
          <table>
            <TableHeader />
            <TableBody />
          </table>
        </main>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  fetch: (state) => dispatch(fetchApi(state)),
  setData: (payload) => dispatch(setUserData(payload)),
});

const mapStateToProps = (state) => ({
  email: state.user.email,
  expenses: state.wallet.expenses,
  currencies: state.wallet.currencies,
  exchangeRates: state.wallet.exchangeRates,
});

Wallet.propTypes = {
  email: PropTypes.string,
}.isRequired;

export default connect(mapStateToProps, mapDispatchToProps)(Wallet);
