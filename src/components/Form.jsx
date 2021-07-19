import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { expensesValues, fetchCurrency } from '../actions';
import getCurrency from '../api';

class Form extends React.Component {
  constructor() {
    super();
    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.currenciesQuotation = this.currenciesQuotation.bind(this);
    this.state = {
      id: 0,
      value: '',
      description: '',
      currency: 'USD',
      method: 'Cartão de crédito',
      tag: 'Alimentação',
      exchangeRates: [],
    };
  }

  componentDidMount() {
    const { currenciesToStore } = this.props;
    currenciesToStore();
  }

  // Lógica do fetch assíncrono setando exchangeRates desenvolvida
  // com a ajuda do Lucas Martins - Turma 10 - Tribo B.

  async currenciesQuotation() {
    const currency = await getCurrency();
    this.setState({ exchangeRates: currency });
  }

  handleChange({ target: { name, value } }) {
    this.setState({ [name]: value });
  }

  async handleClick() {
    await this.currenciesQuotation();
    const { id, value, description, currency, method, tag, exchangeRates } = this.state;
    this.setState({ id: id + 1 });
    const { expensesToSend } = this.props;
    expensesToSend({ id, value, description, currency, method, tag, exchangeRates });
  }

  renderInputValor() {
    return (
      <div>
        <label htmlFor="valor">
          Valor:
          <input
            type="text"
            name="value"
            id="valor"
            onChange={ (event) => this.handleChange(event) }
          />
        </label>
      </div>
    );
  }

  renderInputDescricao() {
    const { description } = this.state;
    return (
      <div>
        <label htmlFor="descricao">
          Descrição:
          <input
            type="text"
            name="description"
            id="descricao"
            value={ description }
            onChange={ (event) => this.handleChange(event) }
          />
        </label>
      </div>
    );
  }

  renderSelectMoeda() {
    const { currency } = this.state;
    const { currenciesFromState } = this.props;
    const allCurrencies = Object.keys(currenciesFromState)
      .filter((curr) => curr !== 'USDT');
    return (
      <div>
        <label htmlFor="moeda">
          Moeda:
          <select
            name="currency"
            id="moeda"
            value={ currency }
            onChange={ (event) => this.handleChange(event) }
          >
            { allCurrencies
              .map((currencies, index) => <option key={ index }>{ currencies }</option>) }
          </select>
        </label>
      </div>
    );
  }

  renderSelectMetodoDePagamento() {
    const { method } = this.state;
    return (
      <div>
        <label htmlFor="metodo">
          Método de pagamento:
          <select
            name="method"
            id="metodo"
            value={ method }
            onChange={ (event) => this.handleChange(event) }
          >
            <option>Dinheiro</option>
            <option>Cartão de crédito</option>
            <option>Cartão de débito</option>
          </select>
        </label>
      </div>
    );
  }

  renderSelectTag() {
    const { tag } = this.state;
    return (
      <div>
        <label htmlFor="tag">
          Tag:
          <select
            name="tag"
            id="tag"
            value={ tag }
            onChange={ (event) => this.handleChange(event) }
          >
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

  render() {
    return (
      <form>
        { this.renderInputValor() }
        { this.renderInputDescricao() }
        { this.renderSelectMoeda() }
        { this.renderSelectMetodoDePagamento() }
        { this.renderSelectTag() }
        <button
          type="button"
          onClick={ this.handleClick }
        >
          Adicionar despesas
        </button>
      </form>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  expensesToSend: (expenses) => dispatch(expensesValues(expenses)),
  currenciesToStore: () => dispatch(fetchCurrency()),
});

const mapStateToProps = (state) => ({
  currenciesFromState: state.wallet.currencies,
});

Form.propTypes = {
  expensesToSend: PropTypes.func,
  currenciesFromState: PropTypes.string.isRequired,
}.isRequired;

export default connect(mapStateToProps, mapDispatchToProps)(Form);
