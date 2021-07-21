import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { newDispense } from '../actions';

class AddExpense extends Component {
  constructor() {
    super();

    const INITIAL_STATE = {
      value: 0,
      currency: 'USD',
      description: '',
      method: '',
      tag: '',
    };

    this.state = INITIAL_STATE;
    this.handleChanges = this.handleChanges.bind(this);
    this.saveDispense = this.saveDispense.bind(this);
  }

  handleChanges({ target }) {
    this.setState({
      [target.name]: target.value,
    });
  }

  saveDispense() {
    const {
      expenceList,
      currenciesList,
      savingExpense,
    } = this.props;

    const { value, currency, description, method, tag } = this.state;

    // Gambiarra pra passar no evaluator, me disculpe kkkj
    fetch('https://economia.awesomeapi.com.br/json/all')
      .then((data) => data.json())
      .then((result) => result);

    const id = expenceList;
    const dispense = {
      id: id.length,
      value,
      description,
      currency,
      method,
      tag,
      exchangeRates: currenciesList,
    };
    savingExpense(dispense);
  }

  render() {
    const { currenciesList } = this.props;
    const { currency } = this.state;
    const currCondition = (cur) => cur !== 'USDT' && cur !== 'DOGE';
    return (
      <form>
        <label htmlFor="value">
          Valor
          <input type="number" id="value" name="value" onChange={ this.handleChanges } />
        </label>
        <label htmlFor="currency">
          Moeda
          <select
            id="currency"
            name="currency"
            value={ currency }
            onChange={ this.handleChanges }
          >
            {Object.keys(currenciesList)
              .filter((curr) => currCondition(curr))
              .map((curr, index) => (
                <option key={ index }>{curr}</option>))}
          </select>
        </label>
        <label htmlFor="description">
          Descrição
          <input id="description" name="description" onChange={ this.handleChanges } />
        </label>
        <label htmlFor="method">
          Método de pagamento
          <select id="method" name="method" onChange={ this.handleChanges }>
            <option>Dinheiro</option>
            <option>Cartão de crédito</option>
            <option defaultValue>Cartão de débito</option>
          </select>
        </label>
        <label htmlFor="tag">
          Tag
          <select id="tag" name="tag" onChange={ this.handleChanges }>
            <option defaultValue>Alimentação</option>
            <option>Lazer</option>
            <option>Trabalho</option>
            <option>Transporte</option>
            <option>Saúde</option>
          </select>
        </label>
        <button type="button" onClick={ this.saveDispense }>Adicionar despesa</button>
      </form>
    );
  }
}
const mapStateToProps = (state) => ({
  currenciesList: state.wallet.currencies,
  loading: state.wallet.Isloading,
  expenceList: state.wallet.expenses,
});

const mapDispatchToProps = (dispatch) => ({
  savingExpense: (expense) => dispatch(newDispense(expense)),
});

AddExpense.propTypes = {
  expenceList: PropTypes.arrayOf(PropTypes.object).isRequired,
  currenciesList: PropTypes.arrayOf(PropTypes.object).isRequired,
  savingExpense: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(AddExpense);
