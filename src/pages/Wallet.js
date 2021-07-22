import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import ExpensesForm from '../components/ExpensesForm';
import Header from '../components/Header';
import { fetchCurrencieAndQuotation } from '../actions/index';

class Wallet extends React.Component {
  componentDidMount() {
    const { getCurrencies } = this.props;
    getCurrencies();
  }

  render() {
    return (
      <div className="wallet-page">
        <Header />
        <ExpensesForm />
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  getCurrencies: () => dispatch(fetchCurrencieAndQuotation()),
});

// const mapStateToProps = (state) => ({
//   currencies: state.wallet.currencies,
// });

export default connect(null, mapDispatchToProps)(Wallet);

Wallet.propTypes = {
  getCurrencies: PropTypes.func.isRequired,
};
