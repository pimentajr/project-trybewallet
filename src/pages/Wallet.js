import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import SetExpense from '../components/EnterExpense';
import ExpenseTable from '../components/TableExpenses';
import EditExpense from '../components/EditExpense';

class Wallet extends React.Component {
  render() {
    const { edit } = this.props;
    return (
      <div className="page-wallet">
        <Header />
        { edit ? <EditExpense /> : <SetExpense />}
        <ExpenseTable />
      </div>
    );
  }
}
const mapStateToProps = (state) => ({ edit: state.wallet.edit });

export default connect(mapStateToProps)(Wallet);

Wallet.propTypes = {
  edit: PropTypes.string.isRequired,
};
