import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class Header extends React.Component {
  render() {
    const { email, expenses } = this.props;
    const total = expenses.reduce((acc, { value, exchangeRates, currency }) => (
      acc + value * exchangeRates[currency].ask
    ), 0);
    return (
      <header className="d-flex justify-content-between p-3 bg-secondary">
        <h3 data-testid="email-field">{`Email: ${email}`}</h3>
        <h3 data-testid="total-field">
          {`Despensa Total: ${total.toFixed(2)}`}
          <span data-testid="header-currency-field">BRL</span>
        </h3>
      </header>
    );
  }
}

const mapStateToProps = (state) => ({
  email: state.user.email,
  expenses: state.wallet.expenses,
});

Header.propTypes = {
  email: PropTypes.string.isRequired,
  expenses: PropTypes.isRequired,
};

export default connect(mapStateToProps)(Header);
