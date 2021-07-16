import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { fetchApi } from '../actions';

class Expenses extends Component {
  constructor() {
    super();

    this.state = {
      currencies: [],
    };
  }

  componentDidMount() {
    this.fetchCurrencies();
  }

  async fetchCurrencies() {
    const { currencies } = this.props;
    const currenciesObj = await currencies();
    const currenciesKeys = Object.keys(currenciesObj.payload);
    const arr = [];
    currenciesKeys.map((currency) => currency !== 'USDT' && arr.push(currency));
    this.setState({ currencies: arr });
  }

  handleChange() {

  }

  render() {
    const { currencies } = this.state;
    return (
      <form>
        <label htmlFor="valor">
          Valor
          <input
            id="valor"
            type="number"
          />
        </label>

        <label htmlFor="descricao">
          Descrição
          <textarea
            id="descricao"
          />
        </label>

        <label htmlFor="moeda">
          Moeda:
          <select id="moeda">
            {currencies.map((cur, index) => <option key={ index }>{ cur }</option>)}
          </select>
        </label>

        <label htmlFor="pgt">
          Método de pagamento:
          <select id="pgt">
            <option value="Dinheiro">Dinheiro</option>
            <option value="Cartão de crédito">Cartão de crédito</option>
            <option value="Cartão de débito">Cartão de débito</option>
          </select>
        </label>

        <label htmlFor="tag">
          Tag:
          <select id="tag">
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
}

Expenses.propTypes = {
  currencies: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  currencies: () => dispatch(fetchApi()),
});

export default connect(null, mapDispatchToProps)(Expenses);
