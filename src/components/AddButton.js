import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addExpense as addExpenseAction } from '../actions';
import fetchCurrencies from '../services/api';

class AddButton extends Component {
  constructor() {
    super();

    this.handleAddClick = this.handleAddClick.bind(this);
    this.state = { id: 0 };
  }

  async handleAddClick() {
    const {
      expense: { value, description, currency, method, tag },
      addExpense,
    } = this.props;
    const { id } = this.state;

    addExpense({
      id,
      value,
      description,
      currency,
      method,
      tag,
      exchangeRates: await fetchCurrencies(),
    });

    this.setState((prevId) => ({ id: prevId.id + 1 }));
  }

  render() {
    return (
      <button
        type="button"
        onClick={ this.handleAddClick }
      >
        Adicionar Despesa
      </button>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  addExpense: (obj) => dispatch(addExpenseAction(obj)),
});

const mapStateToProps = (state) => ({
  expenses: state.wallet.expenses,
});

AddButton.propTypes = {
  expenses: PropTypes.arrayOf(PropTypes.object).isRequired,
  expense: PropTypes.objectOf(PropTypes.shape({
    value: PropTypes.string,
    description: PropTypes.string,
    currency: PropTypes.string,
    payment: PropTypes.string,
    tag: PropTypes.string,
    exchangeRates: PropTypes.objectOf(PropTypes.string),
  })).isRequired,
  addExpense: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(AddButton);
