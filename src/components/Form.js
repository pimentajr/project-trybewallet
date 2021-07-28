import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { expenseAction } from '../actions';

class Form extends Component {
  constructor() {
    super();

    this.state = {
      amout: '',
      description: '',
      coin: [],
      selectedCoin: '',
      payment: '',
      tag: '',
    };

    this.getCoins = this.getCoins.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.sumbitSpent = this.sumbitSpent.bind(this);
  }

  componentDidMount() {
    this.getCoins();
  }

  async getCoins() {
    const response = await fetch('https://economia.awesomeapi.com.br/json/all');
    const data = await response.json();
    const fullData = Object.keys(data).filter((coin) => coin !== 'USDT');
    this.setState({
      coin: fullData,
    });
  }

  handleChange({ target }) {
    const { name, value } = target;

    this.setState({
      [name]: value,
    });
  }

  sumbitSpent() {
    const { sendSpendig } = this.props;
    sendSpendig(this.state);
  }

  render() {
    const { coin } = this.state;
    return (
      <form>
        <label htmlFor="amout">
          Valor
          <input type="text" name="amout" onChange={ this.handleChange } />
        </label>
        <label htmlFor="description">
          Descrição
          <input type="text" name="description" onChange={ this.handleChange } />
        </label>
        <label htmlFor="selectedCoin">
          Moeda
          <select name="selectedCoin" onChange={ this.handleChange }>
            { coin.map((c, index) => <option key={ index }>{ c }</option>)}
          </select>
        </label>
        <label htmlFor="payment">
          Método de pagamento
          <select name="payment" onChange={ this.handleChange }>
            <option>Dinheiro</option>
            <option>Cartão de crédito</option>
            <option>Cartão de débito</option>
          </select>
        </label>
        <label htmlFor="tag">
          Tag
          <select name="tag" onChange={ this.handleChange }>
            <option>Alimentação</option>
            <option>Lazer</option>
            <option>Trabalho</option>
            <option>Transporte</option>
            <option>Saúde</option>
          </select>
        </label>
        <button type="button" onClick={ this.sumbitSpent }>Adicionar despesa</button>
      </form>
    );
  }
}

Form.propTypes = {
  sendSpendig: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  sendSpendig: (value) => dispatch(expenseAction(value)),
});

export default connect(null, mapDispatchToProps)(Form);
