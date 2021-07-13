import React, { Component } from 'react';
import { connect } from 'react-redux';
// import store from '../store';

const DEFAULT_STATE = {
  id: 0,
  value: '',
  description: '',
  coin: 'USD',
  method: 'Dinheiro',
  tag: 'Alimentação',
};

class ExpensesForm extends Component {
  constructor() {
    super();
    this.state = DEFAULT_STATE;
    this.handleChange = this.handleChange.bind(this);
    this.addExpense = this.addExpense.bind(this);
  }

  handleChange(e) {
    const { id, value } = e.target;
    this.setState(() => ({ [id]: value }));
  }

  addExpense() {
    this.setState(() => DEFAULT_STATE);
  }

  mountForms() {
    const { wallet } = this.props;
    const { currencies } = wallet;
    const { value, description, coin, method, tag } = this.state;
    const filteredCoins = currencies
      .map((coins, key) => <option key={ key } value={ coins }>{ coins }</option>);

    return (
      <form className="wallet__form" action="#">
        <label htmlFor="value">
          <strong>Valor</strong>
          <input value={ value } id="value" type="text" onChange={ this.handleChange } />
        </label>
        <label htmlFor="description">
          <strong>Descrição</strong>
          <input
            value={ description }
            id="description"
            type="text"
            onChange={ this.handleChange }
          />
        </label>
        <label htmlFor="coin">
          <strong>Moeda</strong>
          <select id="coin" value={ coin } onClick={ this.handleChange }>
            { filteredCoins }
          </select>
        </label>
        <label htmlFor="method">
          <strong>Método de pagamento</strong>
          <select id="method" value={ method } onChange={ this.handleChange }>
            <option value="Dinheiro">Dinheiro</option>
            <option value="Cartão de crédito">Cartão de crédito</option>
            <option value="Cartão de débito">Cartão de débito</option>
          </select>
        </label>
        <label htmlFor="tag">
          <strong>Tag</strong>
          <select id="tag" value={ tag } onChange={ this.handleChange }>
            <option value="Alimentação">Alimentação</option>
            <option value="Lazer">Lazer</option>
            <option value="Trabalho">Trabalho</option>
            <option value="Transporte">Transporte</option>
            <option value="Saúde">Saúde</option>
          </select>
        </label>
        <button onClick={ this.addExpense } type="button">Adicionar despesa</button>
      </form>
    );
  }

  render() {
    return this.mountForms();
  }
}

const mapStateToProps = (state) => state;

export default connect(mapStateToProps)(ExpensesForm);
