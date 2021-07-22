/* eslint-disable max-lines-per-function */
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { coinsThunk, sendExpenseStore } from '../actions/index';
import { currrenciesApi } from './ApiRequisition';

class Form extends React.Component {
  constructor() {
    super();
    this.state = {
      value: 0,
      description: '',
      currency: 'USD',
      method: 'Dinheiro',
      tag: 'Alimentação',
    };

    this.handleChance = this.handleChance.bind(this);
    this.handleTag = this.handleTag.bind(this);
    this.handleAddDispesa = this.handleAddDispesa.bind(this);
  }

  componentDidMount() {
    const { coins } = this.props;
    coins();
  }

  handleChance({ target }) {
    const { name, value } = target;
    this.setState({ [name]: value });
  }

  handleTag() {
    const { tag } = this.state;
    return (
      <div>
        <label htmlFor="tag">
          Tag
          <select id="tag" name="tag" value={ tag } onChange={ this.handleChance }>
            <option>Alimentação</option>
            <option>Lazer</option>
            <option>Trabalho</option>
            <option>Transporte</option>
            <option>Saúde</option>
          </select>
        </label>
      </div>
    );
  }

  async handleAddDispesa() {
    const { recoverExpenseStore } = this.props;
    const data = await currrenciesApi();
    sendExpenseStore({
      ...this.state,
      id: recoverExpenseStore,
      exchangeRates: data,
    });
  }

  render() {
    const { value, currency, method, description } = this.state;
    const { currencies } = this.props;
    const save = this.handleChance;
    return (
      <div>
        <form>
          <label htmlFor="vl">
            Valor
            <input id="vl" value={ value } type="number" name="value" onChange={ save } />
          </label>
          <label htmlFor="desc">
            Descrição
            <input
              id="desc"
              type="text"
              name="description"
              value={ description }
              onChange={ save }
            />
          </label>
          <label htmlFor="moeda">
            Moeda
            <select id="moeda" name="currency" value={ currency } onChange={ save }>
              {!currencies
                ? <option value="BRL">BRL</option>
                : currencies.map((currenc) => (
                  <option key={ currenc } value={ currenc }>{ currenc }</option>
                ))}
            </select>
          </label>
          <label htmlFor="metodo">
            Método de pagamento
            <select id="metodo" name="method" value={ method } onChange={ save }>
              <option>Dinheiro</option>
              <option>Cartão de crédito</option>
              <option>Cartão de débito</option>
            </select>
          </label>
          <div>
            { this.handleTag() }
          </div>
          <button type="button" onClick={ this.handleAddDispesa }>
            Adicionar Despesas
          </button>
        </form>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  currencies: state.wallet.currencies,
  recoverExpenseStore: state.wallet.expenses,
});

const mapDispatchToProps = (dispatch) => ({
  coins: () => dispatch(coinsThunk()),
  sendExpenseStore: (info) => dispatch(sendExpenseStore(info)),
});

Form.propTypes = {
  getCoins: PropTypes.func,
  // recoverExpenseStore: PropTypes.object,
}.isRequired;

export default connect(mapStateToProps, mapDispatchToProps)(Form);
