import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Header extends React.Component {
  constructor() {
    super();

    this.state = {
      currency: 'BRL',
    };

    this.totalPrice = this.totalPrice.bind(this);
  }

  totalPrice() {
    const { expenses } = this.props;
    if (expenses.length <= 0) {
      return 0;
    }

    const totalPricing = expenses.reduce((curr, acc) => {
      const { currency } = acc;
      const { exchangeRates } = acc;
      const { value } = acc;
      const total = exchangeRates[currency].ask * value;
      return (curr + total);
    }, 0);

    return totalPricing.toFixed(2);

    // console.log(expenses.length > 0 ? expenses[0].exchangeRates.USD.ask * expenses[0].value : 0);
  }

  render() {
    const { userEmail } = this.props;
    const { currency } = this.state;

    return (
      <header>
        <span data-testid="email-field">
          Email:
          {userEmail}
        </span>
        <span data-testid="total-field">
          Despesa total:
          {this.totalPrice()}
        </span>
        <span data-testid="header-currency-field">{currency}</span>
      </header>
    );
  }
}

const mapStateToProps = (state) => ({
  userEmail: state.user.email,
  expenses: state.wallet.expenses,
});

Header.propTypes = {
  userEmail: PropTypes.string,
  expenses: PropTypes.arrayOf(PropTypes.object),
};

Header.defaultProps = {
  userEmail: '',
  expenses: [{}],
};

export default connect(mapStateToProps)(Header);
