import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import EntryForm from '../components/EntryForm';

class Wallet extends React.Component {
  constructor() {
    super();
    this.state = {
      paymentMethod: 'money',
      totalExpenses: 0,
      description: '',
      currencies: [],
      currency: 'USD',
      value: 0,
      tag: 'food',
    };

    this.requestCurrenciesApi = this.requestCurrenciesApi.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    this.requestCurrenciesApi();
  }

  handleChange({ target: { name, value } }) {
    this.setState({
      [name]: value,
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    console.log('test');
  }

  async requestCurrenciesApi() {
    const url = 'https://economia.awesomeapi.com.br/json/all';
    try {
      const request = await fetch(url);
      const data = await request.json();

      const currenciesObj = Object.keys(data);
      const currencies = currenciesObj.filter((currency) => currency !== 'USDT');

      this.setState({ currencies });
    } catch (error) {
      throw new Error('Cannot get the api data');
    }
  }

  render() {
    const { email } = this.props;
    const {
      paymentMethod,
      totalExpenses,
      description,
      currencies,
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
            <strong data-testid="total-field">{`Despesa total: ${totalExpenses}`}</strong>
            <strong data-testid="header-currency-field">BRL</strong>
          </section>
        </header>
        <main>
          <EntryForm
            handleChange={ (event) => this.handleChange(event) }
            handleSubmit={ (event) => this.handleSubmit(event) }
            paymentMethod={ paymentMethod }
            description={ description }
            currencies={ currencies }
            currency={ currency }
            value={ value }
            tag={ tag }
          />
        </main>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  email: state.user.email,
});

Wallet.propTypes = {
  email: PropTypes.string,
}.isRequired;

export default connect(mapStateToProps, null)(Wallet);
