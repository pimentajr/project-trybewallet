import React, { Component } from 'react';
import { connect } from 'react-redux';
import { setCoins, addExpenses } from '../actions';
import TableExpenses from './TableExpenses';

class Form extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: 0,
      description: '',
      currency: '',
      method: 'Dinheiro',
      tag: 'Alimentação',
    };
    this.handleInput = this.handleInput.bind(this);
    this.btnAddExpenses = this.btnAddExpenses.bind(this);
  }

  componentDidMount() {
    const { moeda } = this.props;
    moeda();
  }

  handleInput({ target }) {
    const { name, value } = target;
    this.setState({ [name]: value });
  }

  btnAddExpenses(e) {
    e.preventDefault();
    const { expenses, expense, expenseRates, currencies } = this.props;
    const { value, description, method, currency, tag } = this.state;
    expenses({
      id: expense.length,
      value,
      description,
      method,
      currency,
      tag,
      expenseRates: currencies,
    });
    return <TableExpenses />;
  }

  render() {
    const { value, description, method, currency, tag } = this.state;
    const { currencies } = this.props;
    return (
      <form>
        <label
          htmlFor="valorInput"
        >
          Valor:
          <input
            type="number"
            id="valorInput"
            name="value"
            value={ value }
            onChange={ (e) => this.handleInput(e) }
          />
        </label>
        <label htmlFor="descriptionInput">
          Descrição:
          <input
            type="text"
            id="descriptionInput"
            name="description"
            value={ description }
            onChange={ (e) => this.handleInput(e) }
          />
        </label>
        <label htmlFor="moedaSelect">
          Moeda:
          <select
            id="moedaSelect"
            type="number"
            name="moeda"
            value={ currency }
            onChange={ (e) => this.handleInput(e) }
          >
          {Object.keys(currencies).filter(e => e !== 'USDT').map((e, index )=> <option key={index}>{e}</option>)}
          </select>
        </label>
        <label htmlFor="modePayment">
          Método de pagamento:
          <select
            type="number"
            id="modePayment"
            name="method"
            value={ method }
            onChange={ (e) => this.handleInput(e) }
          >
            <option value="Dinheiro">Dinheiro</option>
            <option value="Cartão de crédito">Cartão de crédito</option>
            <option value="Cartão de débito">Cartão de débito</option>
          </select>
        </label>
        <label htmlFor="tag">
          Tag:
          <select type="number" id="tag" name="tag" value={ tag } onChange={ (e) => this.handleInput(e) }>
            <option value="Alimentação">Alimentação</option>
            <option value="Lazer">Lazer</option>
            <option value="Trabalho">Trabalho</option>
            <option value="Transporte">Transporte</option>
            <option value="Saúde">Saúde</option>
          </select>
        </label>
        <button
          onClick={ (e) => this.btnAddExpenses(e) }
        >
          Adicionar despesa
        </button>
      </form>
    );
  }
}

const mapStateToProps = (state) => ({
  currencies: state.wallet.currencies,
  expense: state.wallet.expenses,
});

const mapDispatchToProps = (dispatch) => ({
  moeda: (state) => dispatch(setCoins(state)),
  expenses: (state) => dispatch(addExpenses(state)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Form);
