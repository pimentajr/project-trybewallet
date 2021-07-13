import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Header from './Header';
import ExpenseForm from './ExpenseForm';
import ExpenseTable from './ExpenseTable';
import { fetchApi } from '../actions';

class Wallet extends React.Component {
  componentDidMount() {
    const { requestAPI } = this.props;
    requestAPI();
  }

  render() {
    return (
      <>
        <Header />
        <ExpenseForm />
        <ExpenseTable />
      </>
    );
  }
}

Wallet.propTypes = {
  requestAPI: PropTypes.func,
}.isRequired;

const mapDispatchToProps = (dispatch) => ({
  requestAPI: () => dispatch(fetchApi()),
});

export default connect(null, mapDispatchToProps)(Wallet);
