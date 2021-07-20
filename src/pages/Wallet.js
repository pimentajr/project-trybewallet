import React, { Component } from 'react';
import { connect } from 'react-redux';
import { APIRequest, fetchCurrencyList } from '../actions';
import Form from '../components/Form';

class Wallet extends Component {
  constructor(props) {
    super(props);

    this.updateGlobalStateTotal = this.updateGlobalStateTotal.bind(this);
  }

  componentDidMount() {
    const { APIfetch } = this.props;
    APIfetch();
  }

  updateGlobalStateTotal() {
    const { expensesData } = this.props;
    const total = expensesData.reduce((acc, cv) => {
      console.log('current value', cv);
      const { value, currency, exchangeRates } = cv;
      const conversion = (parseFloat(value) * exchangeRates[currency].ask);
      return acc + conversion;
    }, 0);
    return (Math.round(total * 100) / 100);
  }

  render() {
    const { userEmail, expensesData } = this.props;
    console.log('expensesData props:', expensesData);
    return (
      <div>
        <div>
          TrybeWallet
          <div data-testid="email-field">
            Email:
            {userEmail}
          </div>
          <div data-testid="total-field">
            <span>Despesa total: R$ </span>
            {!expensesData
              ? 0
              : this.updateGlobalStateTotal()}
          </div>
          <div data-testid="header-currency-field">BRL</div>
        </div>
        <Form />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  userEmail: state.user.email,
  expensesData: state.wallet.expenses,
});

const mapDispatchToProps = (dispatch) => ({
  APIfetch: () => dispatch(fetchCurrencyList()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Wallet);

// {/* .map((obj) => expensesData.find((ol) => ol.currency === obj)) */}
