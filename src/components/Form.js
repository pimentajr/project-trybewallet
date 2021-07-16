/* eslint-disable max-lines-per-function */
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { coinsThunk } from '../actions/index';

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
  }

  componentDidMount() {
    const { coins } = this.props;
    coins();
  }

  handleChance({ target }) {
    const { name, value } = target;
    this.setState({ [name]: value });
    console.log(this.state);
  }

  render() {
    const { value, currency, method, tag, description } = this.state;
    const { currencies } = this.props;
    return (
      <div>
        <form>
          <label htmlFor="valor">
            Valor
            <input
              id="valor"
              value={ value }
              type="number"
              name="value"
              onChange={ this.handleChance }
            />
          </label>
          <label htmlFor="describle">
            Descrição
            <input
              id="describle"
              type="text"
              name="description"
              value={ description }
              onChange={ this.handleChance }
            />
          </label>
          <label htmlFor="moeda">
            Moeda
            <select
              id="moeda"
              name="currency"
              value={ currency }
              onChange={ this.handleChance }
            >
              {!currencies
                ? <option value="BRL">BRL</option>
                : currencies.map((currenc) => (
                  <option key={ currenc } value={ currenc }>{ currenc }</option>
                ))}
            </select>
          </label>
          <label htmlFor="metodo">
            Método de pagamento
            <select
              id="metodo"
              name="method"
              value={ method }
              onChange={ this.handleChance }
            >
              <option>Dinheiro</option>
              <option>Cartão de crédito</option>
              <option>Cartão de débito</option>
            </select>
          </label>
          <label htmlFor="tag">
            Tag
            <select
              id="tag"
              name="tag"
              value={ tag }
              onChange={ this.handleChance }
            >
              <option>Alimentação</option>
              <option>Lazer</option>
              <option>Trabalho</option>
              <option>Transporte</option>
              <option>Saúde</option>
            </select>
          </label>
          <button type="submit">
            Adicionar Despesas
          </button>
        </form>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  currencies: state.wallet.currencies,
});

const mapDispatchToProps = (dispatch) => ({
  coins: () => dispatch(coinsThunk()),
});

Form.propTypes = {
  getCoins: PropTypes.func,
}.isRequired;

export default connect(mapStateToProps, mapDispatchToProps)(Form);
