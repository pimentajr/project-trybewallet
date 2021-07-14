import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { walletAction } from '../actions';

class Form extends Component {
  constructor() {
    super();

    this.state = {
      value: 0,
      description: '',
      currency: 'USD',
      method: 'Dinheiro',
      tag: 'Alimentação',
      exchangeRates: {},
    };

    this.handleClick = this.handleClick.bind(this);
    this.handleChange = this.handleChange.bind(this);    
  }

  handleChange({ target }) {
    const { name, value } = target;
    this.setState({
      [name]: value,
    });
    console.log(name, value)
  }

  handleClick() {
    const { despesas } = this.props;
    despesas(this.state);
    this.setState({
      value: 0,
      method: '',
      description: '',
      currency: '',
      tag: '',
    });
  }

  // eslint-disable-next-line max-lines-per-function
  render() {
    const { value, method, description, currency, tag } = this.state;
    const { moeda } = this.props;
    return (
      <div>
        <form>
          <label htmlFor="valor">
            Valor
            <input
              name="value"
              value={ value }
              type="number"
              placeholder="0"
              id="valor"
              onChange={ this.handleChange }
            />
          </label>
          <label htmlFor="descricao">
            Descrição
            <input
              name="description"
              value={ description }
              type="text"
              id="descricao"
              onChange={ this.handleChange }
            />
          </label>
          <label htmlFor="moeda">
            Moeda
            <select
              name="currency"
              value={ currency }
              id="moeda"
              onChange={ this.handleChange }
            >
              {moeda.map((curren, index) => <option key={ index }>{curren}</option>)}
            </select>
          </label>
          <label htmlFor="method">
            Método de pagamento
            <select
              name="method"
              value={ method }
              id="method"
              onChange={ this.handleChange }
            >
              <option name="method">Dinheiro</option>
              <option name="method">Cartão de crédito</option>
              <option name="method">Cartão de débito</option>
            </select>
          </label>
          <label htmlFor="tag">
            Tag
            <select name="tag" value={ tag } id="tag" onChange={ this.handleChange }>
              <option>Alimentação</option>
              <option>Lazer</option>
              <option>Trabalho</option>
              <option>Transporte</option>
              <option>Saúde</option>
            </select>
          </label>
          <button type="button" onClick={ this.handleClick }>Adicionar despesa</button>
        </form>
      </div>
    );
  }
}

Form.propTypes = {
  moeda: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  despesas: (param) => dispatch(walletAction(param)),
});

const mapStateToProps = (state) => ({
  moeda: state.wallet.currencies,
});

export default connect(mapStateToProps, mapDispatchToProps)(Form);
