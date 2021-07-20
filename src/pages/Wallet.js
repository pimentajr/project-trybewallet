import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchCurrencies } from '../actions';
import Form from '../components/Form';
import ExpensesTable from '../components/ExpensesTable';

class Wallet extends React.Component {
  componentDidMount() {
    const { getCurrencies } = this.props;
    getCurrencies();
  }

  componentDidUpdate() {
    this.handleExpensesSum();
  }

  handleExpensesSum() {
    const { expenses } = this.props;
    let totalValue = 0;

    expenses.forEach(({ value, currency, exchangeRates }) => {
      totalValue += exchangeRates[currency].ask * value;
    });
    // verificar a necessidade de mostrar apenas os dois numeros apos a casa decimal
    // caso haja necessidade, citar o material utilizado como referencia: https://stackoverflow.com/questions/6134039/format-number-to-always-show-2-decimal-places
    const fixedValue = parseFloat(totalValue).toFixed(2);
    // console.log(fixedValue);

    return fixedValue;
  }

  render() {
    const { email } = this.props;
    return (
      <div>
        <header>
          <h3 data-testid="email-field">{ `Usuario: ${email}` }</h3>
          <div data-testid="total-field">{ this.handleExpensesSum() }</div>
          <div data-testid="header-currency-field">BRL</div>
        </header>
        <Form />
        <ExpensesTable />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  email: state.user.email,
  expenses: state.wallet.expenses,
});

const mapDispatchToProps = (dispatch) => ({
  getCurrencies: () => dispatch(fetchCurrencies()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Wallet);

Wallet.defaultProps = {
  email: '',
  // expenses: 0,
};

Wallet.propTypes = {
  email: PropTypes.string,
  getCurrencies: PropTypes.func.isRequired,
  expenses: PropTypes.arrayOf(PropTypes.object).isRequired,
};
