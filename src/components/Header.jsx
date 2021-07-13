import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currency: 'BRL',
    };
  }

  render() {
    const { email, expenses } = this.props;
    const { currency } = this.state;
    const totalValue = expenses.reduce(
      (acc, curr) => parseFloat(acc) + parseFloat(curr.value), 0,
    );

    return (
      <div className="header">
        <h1>TrybeWallet</h1>
        <div className="user-info">
          <div className="user-info-container">
            <p data-testid="email-field">{email}</p>
          </div>
          <div className="user-info-container">
            <p>
              Dispesa Total:
              <span data-testid="total-field">{totalValue}</span>
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
