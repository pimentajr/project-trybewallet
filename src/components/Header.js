import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class Header extends React.Component {
  totalValueFunc() {
    const { expenses } = this.props;
    let counter = 0;
    expenses.forEach((expense) => {
      counter += Number(expense
        .value) * Number(expense.exchangeRates[expense.currency].ask);
    });

    return counter;
  }

  render() {
    const { email } = this.props;
    return (
      <header>
        <p data-testid="email-field">
          Email:
          { email }
        </p>
        <div>
          <p data-testid="total-field">
            {`Despesa Total: ${this.totalValueFunc()}`}
          </p>
          <p data-testid="header-currency-field">BRL</p>
        </div>
      </header>
    );
  }
}

Header.propTypes = ({
  email: PropTypes.string,
}).isRequired;

// requisito 5 feito com ajuda da Gabi Feijó
const mapStateToProps = (state) => ({
  email: state.user.email,
  expenses: state.wallet.expenses,
});

export default connect(mapStateToProps)(Header);
