import { connect } from 'react-redux';
import React from 'react';
import PropTypes from 'prop-types';
import Forms from '../components/Forms';
import Header from '../components/Header';
import { currencyApiThunk } from '../actions/index';
import ExpenseTable from '../components/ExpenseTable';

class Wallet extends React.Component {
  componentDidMount() {
    const { sendInfoToThunk } = this.props;
    sendInfoToThunk();
  }

  render() {
    return (
      <div>
        <Header />
        TrybeWallet
        <Forms />
        <ExpenseTable />
      </div>
    );
  }
}
const mapDispathToProps = (dispatch) => ({
  sendInfoToThunk: () => dispatch(currencyApiThunk()),
});

export default connect(null, mapDispathToProps)(Wallet);

Wallet.propTypes = {
  sendInfoToThunk: PropTypes.func,
  expenses: PropTypes.array,
}.isRequired;
