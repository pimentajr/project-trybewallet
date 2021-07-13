import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      total: 0,
      currency: 'BRL',
    };
  }

  render() {
    const { email, expenses } = this.props;
    const { currency } = this.state;
    let { total } = this.state;
    if (expenses.length > 0) {
      total = expenses.reduce((acc, curr) => {
        const parse = Number(curr.exchangeRates[curr.currency].ask);
        acc += Number(parse) + Number(curr.value);
        return acc;
      }, 0).toFixed(2);
    }

    return (
      <div className="header">
        <h1>TrybeWallet</h1>
        <div className="user-info">
          <div className="user-info-container">
            <p data-testid="email-field">{email}</p>
          </div>
          <div className="user-info-container">
            <p>
              <span data-testid="total-field">{total}</span>
              <span data-testid="header-currency-field">{currency}</span>
            </p>
          </div>
        </div>
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
