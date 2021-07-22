import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import WalletForm from '../components/WalletForm';
import WalletTable from '../components/WalletTable';

class Wallet extends React.Component {
  render() {
    const { userEmail, totalExpenses } = this.props;
    let expenses = 0;
    totalExpenses.forEach((obj) => {
      console.log(obj);
      const sum = Number(obj.value) * Number(obj.exchangeRates[obj.currency].ask);
      expenses += sum;
    });
    return (
      <div>
        <div>Pagina do wallet</div>
        <header>
          <div data-testid="email-field">{ `E-mail: ${userEmail}` }</div>
          <div data-testid="total-field">{`Total das despesas: ${expenses}`}</div>
          <div data-testid="header-currency-field"> BRL </div>
        </header>
        <WalletForm />
        <WalletTable />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  userEmail: state.user.email,
  totalExpenses: state.wallet.expenses,
});

Wallet.propTypes = {
  userEmail: PropTypes.string,
}.isRequired;
export default connect(mapStateToProps)(Wallet);
