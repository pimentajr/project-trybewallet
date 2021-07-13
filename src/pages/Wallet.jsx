import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import EntryForm from '../components/EntryForm';

class Wallet extends React.Component {
  constructor() {
    super();
    this.state = {
      totalExpenses: 0,
      currencies: [],
    };

    this.requestCurrenciesApi = this.requestCurrenciesApi.bind(this);
  }

  componentDidMount() {
    this.requestCurrenciesApi();
  }

  async requestCurrenciesApi() {
    const url = 'https://economia.awesomeapi.com.br/json/all';
    try {
      const request = await fetch(url);
      const data = await request.json();

      const currencies = Object.values(data);

      currencies.map((currency) => ({
        code: currency.code,
      }));

      this.setState({ currencies });
    } catch (error) {
      throw new Error('Cannot get the api data');
    }
  }

  render() {
    const { email } = this.props;
    const { totalExpenses, currencies } = this.state;
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
          <EntryForm currencies={ currencies } />
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
