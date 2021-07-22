import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class Header extends React.Component {
  render() {
    const { email, expenses } = this.props;
    const reduceFunc = (acc, cur) => {
      const soma = cur.value * cur.exchangeRates[cur.currency].ask;
      return acc + soma;
    };
    const total = expenses.reduce(reduceFunc, 0);
    return (
      <div>
        <p data-testid="email-field">{`Email: ${email}`}</p>
        <p data-testid="total-field">
          {`Despensa Total: ${total.toFixed(2)}`}
          <span data-testid="header-currency-field">BRL</span>
        </p>
      </div>
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
