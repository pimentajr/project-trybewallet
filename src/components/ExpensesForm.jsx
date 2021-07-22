import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { API, addExpense } from '../actions';
import Button from './Button';
import Currency from './Currency';
import Value from './Value';
import Tag from './Tag';
import Payment from './Payment';
import Description from './Description';

class ExpensesForm extends Component {
  constructor() {
    super();
    this.state = {
      currencies: [],
      value: '',
      description: '',
      method: '',
      tag: '',
      currency: '',
    };
    this.handleClick = this.handleClick.bind(this);
    this.handleChange = this.handleChange.bind(this);
    // this.paymentForm = this.paymentForm.bind(this);
  }

  componentDidMount() {
    this.getCurrencies();
  }

  async getCurrencies() {
    const currencies = Object.keys(await API());
    this.setState({ currencies });
  }

  async handleClick() {
    // const { addexpense, API, loading } = this.props;
    // if (loading === false) {
    //   API();
    // }
    // this.setState((prevState) => ({
    //   id: prevState.id + 1,
    // }));
    // addexpense(this.state);
    const { currency, value, description, method, tag } = this.state;
    const { addexpense, expenses } = this.props;
    const results = await API();
    const obj = {
      id: expenses.length,
      description,
      tag,
      method,
      value,
      currency,
      exchangeRates: results,
    };
    this.setState({
      currency: '',
      value: '',
      description: '',
      method: '',
      tag: '',
    });
    addexpense(obj);
  }

  handleChange({ target: { name, value } }) {
    this.setState({
      [name]: value,
    });
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
    const { value, description, tag, method, currency, currencies } = this.state;
    return (
      <div>
        <form>
          <Value handleChange={ this.handleChange } value={ value } />
          <Description description={ description } handleChange={ this.handleChange } />
          <Currency
            handleChange={ this.handleChange }
            value={ currency }
            currencies={ currencies }
          />
          <Payment method={ method } handleChange={ this.handleChange } />
          <Tag tag={ tag } handleChange={ this.handleChange } />
          <Button addExpense={ this.handleClick } />
        </form>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  // currencies: state.wallet.currencies,
  expenses: state.wallet.expenses,
  // id: state.wallet.id,
  loading: state.wallet.loading,
});

const mapDispatchToProps = (dispatch) => ({
  addexpense: (data) => dispatch(addExpense(data)),
});

ExpensesForm.propTypes = {
  // email: PropTypes.string.isRequired,
  // currencies: PropTypes.arrayOf(Object).isRequired,
  addexpense: PropTypes.func.isRequired,
  // expenses: PropTypes.arrayOf(PropTypes.object).isRequired,
  // id: PropTypes.number.isRequired,
  // loading: PropTypes.bool.isRequired,
}.isRequired;

export default connect(mapStateToProps, mapDispatchToProps)(ExpensesForm);
