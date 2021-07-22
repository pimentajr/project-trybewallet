import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currency: 'BRL',
    };
  }

  calculateTotal() {
    const { expenses } = this.props;
    const total = expenses
      .map((obj) => Number(obj.value) * obj.exchangeRates[obj.currency].ask)
      .reduce((acc, curr) => acc + curr, 0).toFixed(2);
    return total;
  }

  render() {
    const { currency } = this.state;
    const { email } = this.props;

    return (
      <div>
        <p data-testid="email-field">
          { `Email: ${email}` }
        </p>
        <p data-testid="total-field">
          { `Total: ${this.calculateTotal()}` }
        </p>
        <p data-testid="header-currency-field">
          { `Moeda: ${currency}` }
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
  expenses: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default connect(mapStateToProps)(Header);
