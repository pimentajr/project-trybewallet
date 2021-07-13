import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import ValueInput from '../components/ValueInput';
import DescriptionInput from '../components/DescriptionInput';
import CurrencyInput from '../components/CurrencyInput';
import MethodInput from '../components/MethodInput';
import TagInput from '../components/TagInput';
import { setExpense } from '../actions';

class ExpenseForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: 0,
      description: '',
      currency: 'USD',
      method: 'Dinheiro',
      tag: 'Alimentação',
    };
    this.handleChange = this.handleChange.bind(this);
    this.btnSaveExpenses = this.btnSaveExpenses.bind(this);
  }

  handleChange({ target }) {
    this.setState({ [target.name]: target.value });
  }

  btnSaveExpenses() {
    const { saveExpense, id } = this.props;
    const { value, description, currency, method, tag } = this.state;
    saveExpense({ id, value, description, currency, method, tag });
    this.setState({
      value: 0,
      description: '',
      currency: 'USD',
      method: 'Dinheiro',
      tag: 'Alimentação',
    });
  }

  render() {
    const { value, description, currency, method, tag } = this.state;
    return (
      <form>
        <ValueInput handle={ this.handleChange } value={ value } />
        <DescriptionInput handle={ this.handleChange } value={ description } />
        <CurrencyInput handle={ this.handleChange } value={ currency } />
        <MethodInput handle={ this.handleChange } value={ method } />
        <TagInput handle={ this.handleChange } value={ tag } />

        <button type="button" onClick={ this.btnSaveExpenses }>Adicionar Despesas</button>
      </form>
    );
  }
}

const mapStateToProps = (state) => ({
  id: state.wallet.id,
});

const mapDispatchToProps = (dispatch) => ({
  saveExpense: (expense) => dispatch(setExpense(expense)),
});

ExpenseForm.propTypes = {
  saveExpense: PropTypes.func,
  id: PropTypes.number,
}.isRequired;

export default connect(mapStateToProps, mapDispatchToProps)(ExpenseForm);
