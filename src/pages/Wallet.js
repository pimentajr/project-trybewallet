import React from 'react';
import { connect } from 'react-redux';
import propTypes from 'prop-types';
import Header from '../components/Header';
import ExpensesForm from '../components/ExpensesForm';
import { apiFetching } from '../actions';

class Wallet extends React.Component {
  componentDidMount() {
    const { currenciesFromAPI } = this.props;
    currenciesFromAPI();
  }

  render() {
    return (
      <div>
        <h1>TrybeWallet</h1>
        <Header />
        <ExpensesForm />
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  currenciesFromAPI: () => dispatch(apiFetching()),
});

const mapStateToProps = ({ wallet: { currencies } }) => ({
  currencies,
});

Wallet.propTypes = {
  currenciesFromAPI: propTypes.array,
}.isRequired;

export default connect(mapStateToProps, mapDispatchToProps)(Wallet);
