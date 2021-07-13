import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { fetchAPI } from '../actions/walletActionsAPI';
import { getExpenses } from '../actions/walletActions';
import Forms from './Forms';

class Wallet extends React.Component {
  componentDidMount() {
    const { currencies } = this.props;
    currencies();
  }

  render() {
    const { getEmail, getExpenses1 } = this.props;
    const total = getExpenses1.reduce((acc, { exchangeRates, currency, value }) => (
      acc + (Number(exchangeRates[currency].ask * value))), 0);
    return (
      <div>
        TrybeWallet
        <header data-testid="email-field">
          <div>
            { getEmail }
          </div>
          <div data-testid="total-field">{`Despesa TotalR$: ${total || 0}`}</div>
          <div data-testid="header-currency-field">Câmbio: BRL </div>
        </header>
        <Forms />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  getEmail: state.user.email,
  getExpenses1: state.wallet.expenses,
});

const mapDispatchToProps = (dispatch) => ({
  currencies: () => dispatch(fetchAPI()),
  expenses: (expense) => dispatch(getExpenses(expense)),
  // fazer o dispatch do botao para salvar no array,
});

Wallet.propTypes = {
  getEmail: PropTypes.string.isRequired,
  currencies: PropTypes.func.isRequired,
  getExpenses1: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Wallet);
