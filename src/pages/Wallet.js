import React, { Component } from 'react';
import { connect } from 'react-redux';
import { APIRequest, fetchCurrencyList } from '../actions';
import Form from '../components/Form';

class Wallet extends Component {

  componentDidMount() {
    const { APIfetch } = this.props;
    APIfetch();
  }

  render() {
    const { userEmail, expensesData } = this.props;
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
            0
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
