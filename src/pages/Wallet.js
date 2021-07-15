import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { fetchApi } from '../actions';
// import wallet from '../reducers/wallet';
import Form from './Form';
import { Table } from './Table';

class Wallet extends React.Component {
  render() {
    const { emailReducer, expensesReducer, callApi } = this.props;
    const spent = expensesReducer.reduce((acc, { exchangeRates, currency, value }) => (
      acc + (Number((exchangeRates[currency].ask * value)))
    ), 0);
    return (
      <>
        <header>
          <h2 data-testid="email-field">{ emailReducer }</h2>
          <h3 data-testid="header-currency-field">
            despesa total
            <span data-testid="total-field">{spent || 0}</span>
            BRL
          </h3>
        </header>
        <Form
          expensesReducer={ expensesReducer }
          callApi={ callApi }
        />
        <Table expensesReducer={ expensesReducer } />
      </>
    );
  }
}

const mapStatetoProps = (state) => ({
  emailReducer: state.user.email,
  expensesReducer: state.wallet.expenses,
});

const mapDispatchToProps = (dispatch) => ({
  callApi: (state) => dispatch(fetchApi(state)),
  // chanceDescription: (id) => dispatch(removeDescription(id)),
});

Wallet.propTypes = ({
  emailReducer: PropTypes.func,
  expensesReducer: PropTypes.func,
  callApi: PropTypes.func,
}).isRequired;

export default connect(mapStatetoProps, mapDispatchToProps)(Wallet);
