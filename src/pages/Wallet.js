import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import AddExpense from '../components/AddExpense';
import {
  requestCurrencies,
  receivedCurrencies,
} from '../actions';
import Table from '../components/Table';

class Wallet extends React.Component {
  constructor() {
    super();

    this.getCurrencies = this.getCurrencies.bind(this);
  }

  componentDidMount() {
    this.getCurrencies();
  }

  getCurrencies() {
    const { requestingCurrencies, receivingCurrencies } = this.props;
    requestingCurrencies();
    fetch('https://economia.awesomeapi.com.br/json/all')
      .then((data) => data.json())
      .then((result) => receivingCurrencies(result));
  }

  render() {
    // const pageComponents = () => (
    //   <>
    //     <AddExpense />
    //     <Table />
    //   </>
    // );
    const { loading } = this.props;
    const loadingLogic = loading ? <h1>Carregando</h1> : <AddExpense />;
    return (
      <>
        <Header />
        { loadingLogic }
        <Table />
        TrybeWallet
      </>);
  }
}

const mapStateToProps = (state) => ({
  loading: state.wallet.isLoading,
});

const mapDispatchToProps = (dispatch) => ({
  requestingCurrencies: () => dispatch(requestCurrencies()),
  receivingCurrencies: (value) => dispatch(receivedCurrencies(value)),
});

Wallet.propTypes = {
  requestingCurrencies: PropTypes.func.isRequired,
  receivingCurrencies: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Wallet);
