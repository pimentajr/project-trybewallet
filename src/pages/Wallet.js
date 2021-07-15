import React from 'react';
// import PropTypes from 'prop-types';
// import { connect } from 'react-redux';
import FormWallet from './FormWallet';
import Header from './Header';

class Wallet extends React.Component {
  render() {
    // const { userEmail } = this.props;
    return (
      <div calssName="wallet">
        {/* <header>
          <h1 calssName="wallet">TrybeWallet</h1>
          <h3>Olá</h3>
          <h3 data-testid="email-field">
            { userEmail }
          </h3>
          <label htmlFor="currency">
            Valor de despesas: R$
            <input data-testid="total-field" type="number" />
            <input data-testid="header-currency-field" type="text" value="BRL" />
          </label>
        </header> */}
        <Header />
        <FormWallet />
      </div>
    );
  }
}

export default Wallet;
