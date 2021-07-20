import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addExpenses } from '../actions';

class Form extends Component {
  constructor(props) {
    super(props);

    this.state = {
      id: 0,
      value: '',
      description: 'anything',
      currency: 'USD',
      method: '',
      tag: 'Alimentação',
      exchangeRates: {},
    };

    this.handleChange = this.handleChange.bind(this);
    this.updateGlobalState = this.updateGlobalState.bind(this);
  }

  handleChange({ target: { name, value } }) {
    this.setState({
      [name]: value,
    });
  }

  async updateGlobalState() {
    const response = await this.fetchCurrencyList();
    this.setState(() => ({
      exchangeRates: response,
    }));
    const { handleClickSave } = this.props;
    const { state } = this;
    handleClickSave(state);
    this.setState((prevState) => ({
      id: prevState.id + 1,
    }));
  }

  async fetchCurrencyList() {
    const response = await fetch('https://economia.awesomeapi.com.br/json/all');
    const responseObject = await response.json();
    return responseObject;
  }

  render() {
    const { receivedCurrencies, handleClickSave } = this.props;
    return (
      <div>
        <form>
          <label htmlFor="value">
            Valor:
            <input name="value" type="text" id="value" onChange={ this.handleChange } />
          </label>
          <label htmlFor="description">
            Descrição:
            <input name="description" type="text" id="description" onChange={ this.handleChange } />
          </label>
          <label htmlFor="currency">
            Moeda
            <select name="currency" id="currency" onChange={ this.handleChange }>
              {receivedCurrencies
                ? receivedCurrencies
                  .filter((coin) => coin !== 'USDT')
                  .map((coinFinal, index) => <option key={ index }>{coinFinal}</option>)
                : '' }
            </select>
          </label>
          <label htmlFor="payment-option">
            Método de pagamento:
            <select name="method" id="payment-option" onChange={ this.handleChange }>
              <option>Dinheiro</option>
              <option>Cartão de crédito</option>
              <option>Cartão de débito</option>
            </select>
          </label>
          <label htmlFor="tag">
            Tag:
            <select name="tag" id="tag" onChange={ this.handleChange }>
              <option>Alimentação</option>
              <option>Lazer</option>
              <option>Trabalho</option>
              <option>Transporte</option>
              <option>Saúde</option>
            </select>
          </label>
          <button
            type="button"
            onClick={ () => this.updateGlobalState() }
          >
            Adicionar despesa
          </button>
        </form>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  receivedCurrencies: state.wallet.currencies,
});

const mapDispatchToProps = (dispatch) => ({
  handleClickSave: (state) => dispatch(addExpenses(state)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Form);
