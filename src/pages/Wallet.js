import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addExpense, fetchAPI } from '../actions';
import TableRender from '../components/TableRender';
import Header from '../components/Header';
import Expenses from '../components/ExpensesForm';

class Wallet extends Component {
  componentDidMount() {
    const { API } = this.props;
    API();
  }

  // this.totalExpenses = this.totalExpenses.bind(this);
  // this.paymentForm = this.paymentForm.bind(this);
  // async getCurrencies() {
  //   const currencies = Object.keys(await API());
  //   this.setState({
  //     currencies,
  //   });
  // }
  // async adicionandodespesa() {
  //   const { currency, value, description, method, tag, id } = this.state;
  //   const { addexpense } = this.props;
  //   const expense = { currency, value, description, method, tag, id };
  //   const data = await fetchAPI();
  //   expense.exchangeRates = data;
  //   addexpense(expense);
  //   this.setstate({
  //     currency: '',
  //     value: '',
  //     description: '',
  //     method: '',
  //     tag: '',
  //     id: id + 1,
  //   });
  // }

  // handleClick() {
  //   const { addexpense } = this.props;
  //   addexpense(this.state);
  // }

  // handleChange({ target: { name, value } }) {
  //   this.setState({
  //     [name]: value,
  //   });
  // }

  // Header() {
  //   const { email } = this.props;
  //   return (
  //     <header>
  //       <p data-testid="email-field" name="email">{email}</p>
  //       <p data-testid="total-field" name="total">
  //         { this.totalExpenses() }
  //       </p>
  //       <p data-testid="header-currency-field" name="currency">BRL</p>
  //     </header>
  //   );
  // }

  // totalExpenses() {
  //   const { expenses } = this.props;
  //   if (expenses !== undefined) {
  //     return expenses.reduce((acc, expense) => {
  //       const tax = Number(expense.exchangeRates[expense.currency].ask);
  //       return acc + parseFloat(tax) * parseFloat(Number(expense.value));
  //     }, 0).toFixed(2);
  //   }
  //   return 0;
  // }

  render() {
    return (
      <div>
        {/* <header>
          <p data-testid="email-field" name="email">{ email }</p>
          <p data-testid="total-field" name="total">
            TotalExpenses
          </p>
          <p data-testid="header-currency-field" name="currency">BRL</p>
        </header> */}
        <Header />
        <TableRender />
        <Expenses />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  email: state.user.email,
  currencies: state.wallet.currencies,
  expenses: state.wallet.expenses,
  // id: state.wallet.id,
  loading: state.wallet.loading,
});

const mapDispatchToProps = (dispatch) => ({
  API: () => dispatch(fetchAPI()),
  addexpense: (data) => dispatch(addExpense(data)),
});

Wallet.propTypes = {
  email: PropTypes.string.isRequired,
  // currencies: PropTypes.arrayOf(PropTypes.string).isRequired,
  // API: PropTypes.func.isRequired,
  // addexpense: PropTypes.func.isRequired,
  // expenses: PropTypes.arrayOf(PropTypes.object).isRequired,
  // id: PropTypes.number.isRequired,
}.isRequired;

export default connect(mapStateToProps, mapDispatchToProps)(Wallet);
