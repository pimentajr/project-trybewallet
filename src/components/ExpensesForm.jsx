import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { API, addExpense, fetchAPI } from '../actions';
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
      // currencies: [],
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
    const { fetchingAPI } = this.props;
    fetchingAPI();
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

  render() {
    const { value, description, tag, method, currency } = this.state;
    const { currencies } = this.props;
    return (
      <div>
        <form>
          <Value handleChange={ this.handleChange } value={ value } />
          <Description description={ description } handleChange={ this.handleChange } />
          { currencies && <Currency
            handleChange={ this.handleChange }
            value={ currency }
            currencies={ currencies }
          /> }
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
  currencies: state.wallet.currencies,
});

const mapDispatchToProps = (dispatch) => ({
  addexpense: (data) => dispatch(addExpense(data)),
  fetchingAPI: () => dispatch(fetchAPI()),
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
