import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { /* fetchCoins */ requestCurrency, addExpense } from '../actions';

class AddExpenses extends Component {
  constructor() {
    super();
    this.state = {
      value: 0,
      description: '',
      currency: 'USD',
      method: 'Dinheiro',
      tag: 'Alimentação',
    };
    this.handleChangeToAdd = this.handleChangeToAdd.bind(this);
    this.renderValueAndDescribe = this.renderValueAndDescribe.bind(this);
    this.renderPayAndTag = this.renderPayAndTag.bind(this);
  }

  componentDidMount() {
    const { recieveCurrency } = this.props;
    recieveCurrency();
  }

  handleChangeToAdd({ target }) {
    const { name, value } = target;
    this.setState({
      [name]: value,
    });
  }

  renderValueAndDescribe() {
    return (
      <form>
        <label htmlFor="value">
          Valor
          <input
            type="number"
            name="value"
            id="value"
            onChange={ this.handleChangeToAdd }
          />
        </label>
        <label htmlFor="description">
          Descrição
          <input
            type="text"
            name="description"
            id="description"
            onChange={ this.handleChangeToAdd }
          />
        </label>
      </form>
    );
  }

  renderPayAndTag() {
    return (
      <form>
        <label htmlFor="method">
          Método de pagamento
          <select
            type="select"
            name="method"
            id="method"
            onChange={ this.handleChangeToAdd }
          >
            <option>Dinheiro</option>
            <option>Cartão de crédito</option>
            <option>Cartão de débito</option>
          </select>
        </label>
        <label htmlFor="tag">
          Tag
          <select
            type="select"
            name="tag"
            id="tag"
            onChange={ this.handleChangeToAdd }
          >
            <option>Alimentação</option>
            <option>Lazer</option>
            <option>Trabalho</option>
            <option>Transporte</option>
            <option>Saúde</option>
          </select>
        </label>
      </form>
    );
  }

  render() {
    const { mapCurrencies, thisExpense } = this.props;
    delete mapCurrencies.USDT;
    const { value, description, /* currency */ method, tag } = this.state;
    return (
      <>
        {this.renderValueAndDescribe()}
        <form>
          <label htmlFor="currency">
            Moeda
            <select
              type="select"
              name="currency"
              id="currency"
              onChange={ this.handleChangeToAdd }
            >
              {Object.values(mapCurrencies)
                .map((currency, index) => <option key={ index }>{currency.code}</option>)}
            </select>
          </label>
        </form>
        {this.renderPayAndTag()}
        <button
          type="reset"
          onClick={ () => {
            thisExpense(this.state);
          } }
        >
          Adicionar despesa
        </button>
        <p>{value}</p>
        <p>{description}</p>
        {/* <p>{currency}</p> */}
        <p>{method}</p>
        <p>{tag}</p>
      </>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  /* recieveCoins: () => dispatch(fetchCoins()), */
  recieveCurrency: () => dispatch(requestCurrency()),
  thisExpense: (expenses) => dispatch(addExpense(expenses)),
});

const mapStateToProps = (state) => ({
  /* coins: state.wallet.currency, */
  mapCurrencies: state.wallet.currencies,
  currencies: state.wallet.currencies,
  id: state.wallet.id,
});

AddExpenses.propTypes = {
  coins: PropTypes.array,
}.isRequired;

export default connect(mapStateToProps, mapDispatchToProps)(AddExpenses);
