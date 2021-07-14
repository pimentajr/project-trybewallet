import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import '../styles/Wallet.css';

class Header extends Component {
  constructor(props) {
    super(props);
    this.calculateExpenses = this.calculateExpenses.bind(this);
  }

  calculateExpenses() {
    const { expenses } = this.props;
    const total = expenses.reduce((acc, curr) => {
      const numb = curr.exchangeRates[curr.currency].ask * Number.parseFloat(curr.value);
      return acc + numb;
    }, 0);
    return total;
  }

  render() {
    const { userEmail } = this.props;
    return (
      <div>
        <header>
          <h1>lucasWallet</h1>
          <div className="subHeader">
            <p data-testid="email-field">
              {'Email: '}
              { userEmail }
            </p>
            <p data-testid="total-field">
              Despesa Total: R$
              { this.calculateExpenses().toFixed(2) }
              <span data-testid="header-currency-field"> BRL</span>
            </p>
          </div>
        </header>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  userEmail: state.user.email,
  expenses: state.wallet.expenses,
});

Header.propTypes = {
  userEmail: PropTypes.string.isRequired,
  expenses: PropTypes.arrayOf(Object).isRequired,
};

export default connect(mapStateToProps)(Header);
