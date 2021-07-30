import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addExpense, fetchAPI } from '../actions';
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
      id: '',
      value: '',
      description: '',
      method: '',
      tag: '',
      currency: '',
      exchangeRates: [],
    };
    this.handleClick = this.handleClick.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    const { apiResult } = this.props;
    apiResult();
  }

  async handleClick() {
    const { currency, value, description, method, tag } = this.state;
    const { addexpense, expenses } = this.props;
    this.setState({
      id: expenses.length,
      currency,
      value,
      description,
      method,
      tag,
      exchangeRates: await fetch('https://economia.awesomeapi.com.br/json/all')
        .then((result) => result.json()),
    });
    addexpense(this.state);
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
          <Button handleClick={ this.handleClick } />
        </form>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  expenses: state.wallet.expenses,
  currencies: state.wallet.currencies,
});

const mapDispatchToProps = (dispatch) => ({
  addexpense: (data) => dispatch(addExpense(data)),
  apiResult: () => dispatch(fetchAPI()),
});

ExpensesForm.propTypes = {
  addexpense: PropTypes.func.isRequired,
}.isRequired;

export default connect(mapStateToProps, mapDispatchToProps)(ExpensesForm);
