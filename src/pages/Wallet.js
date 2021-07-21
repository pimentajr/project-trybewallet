import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchAPI } from '../actions';
import Expenses from '../components/ExpensesForm';
import TableRender from '../components/TableRender';

class Wallet extends Component {
  // this.handleClick = this.handleClick.bind(this);
  // this.handleChange = this.handleChange.bind(this);
  // this.totalExpenses = this.totalExpenses.bind(this);
  // this.paymentForm = this.paymentForm.bind(this);

  componentDidMount() {
    const { API } = this.props;
    API();
  }

  // handleClick() {
  //   const { addexpense } = this.props;
  //   addexpense(this.state);
  // }

  handleChange({ target: { name, value } }) {
    this.setState({
      [name]: value,
    });
  }

  Header() {
    const { email } = this.props;
    return (
      <header>
        <p data-testid="email-field" name="email">{email}</p>
        <p data-testid="total-field" name="total">
          { this.totalExpenses() }
        </p>
        <p data-testid="header-currency-field" name="currency">BRL</p>
      </header>
    );
  }

  totalExpenses() {
    const { expenses } = this.props;
    if (expenses !== undefined) {
      return expenses.reduce((acc, expense) => {
        const tax = Number(expense.exchangeRates[expense.currency].ask);
        return acc + parseFloat(tax) * parseFloat(Number(expense.value));
      }, 0).toFixed(2);
    }
    return 0;
  }

  // Form() {
  //   const { currencies } = this.props;
  //   return (
  //     <form>
  //       <label htmlFor="value">
  //         Valor
  //         <input
  //           type="number"
  //           name="value"
  //           id="value"
  //           data-testid="value-input"
  //           onChange={ this.handleChange }
  //         />
  //       </label>
  //       <label htmlFor="description">
  //         Descrição
  //         <input
  //           data-testid="description-input"
  //           type="text"
  //           name="description"
  //           id="description"
  //           onChange={ this.handleChange }
  //         />
  //       </label>
  //       <label htmlFor="currency">
  //         Moeda
  //         <select
  //           data-testid="currency-input"
  //           name="currency"
  //           id="currency"
  //           onChange={ this.handleChange }
  //         >
  //           { currencies.map((currency, key) => (
  //             <option key={ key } value={ currency }>
  //               { currency }
  //             </option>))}
  //         </select>
  //       </label>
  //       { this.paymentForm() }
  //       { this.CategoryForm() }
  //       <button
  //         type="button"
  //         onClick={ this.handleClick }
  //       >
  //         Adicionar despesa
  //       </button>
  //     </form>
  //   );
  // }

  // paymentForm() {
  //   const paymentMethods = ['Dinheiro', 'Cartão de crédito', 'Cartão de débito'];
  //   return (
  //     <label htmlFor="method">
  //       Método de pagamento:
  //       <select
  //         data-testid="method-input"
  //         name="method"
  //         id="method"
  //         onChange={ this.handleChange }
  //       >
  //         { paymentMethods.map((method, key) => (
  //           <option key={ key } value={ method }>{ method }</option>))}
  //       </select>
  //     </label>
  //   );
  // }

  // CategoryForm() {
  //   const categories = ['Alimentação', 'Lazer', 'Trabalho', 'Transporte', 'Saúde'];
  //   return (
  //     <label htmlFor="tag">
  //       Tag:
  //       <select
  //         data-testid="tag-input"
  //         name="tag"
  //         id="tag"
  //         onChange={ this.handleChange }
  //       >
  //         { categories.map((category, key) => (
  //           <option key={ key } value={ category }>
  //             { category }
  //           </option>
  //         ))}
  //       </select>
  //     </label>
  //   );
  // }

  render() {
    return (
      <div>
        { this.Header() }
        <Expenses />
        <TableRender />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  email: state.user.email,
  // currencies: state.wallet.currencies,
  expenses: state.wallet.expenses,
  // id: state.wallet.id,
  loading: state.wallet.loading,
});

const mapDispatchToProps = (dispatch) => ({
  API: () => dispatch(fetchAPI()),
  // addexpense: (data) => dispatch(addExpense(data)),
});

Wallet.propTypes = {
  email: PropTypes.string.isRequired,
  // currencies: PropTypes.arrayOf(PropTypes.string).isRequired,
  API: PropTypes.func.isRequired,
  // addexpense: PropTypes.func.isRequired,
  expenses: PropTypes.arrayOf(PropTypes.object).isRequired,
  // id: PropTypes.number.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Wallet);
