import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Valor from './Valor';
import { fetchExpense } from '../actions';

class Form extends Component {
  constructor({ sendExp }) {
    super({ sendExp });
    this.state = {
      value: 0,
      moeda: 'USD',
      tag: 'Alimentação',
      descricao: '',
      pay: 'Dinheiro',
      id: sendExp.length || 0,
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  handleChange({ target }) {
    const { name, value } = target;
    this.setState({ [name]: value });
  }

  handleClick() {
    const { sendExpense, sendExp } = this.props;
    sendExpense(this.state);
    this.setState({
      value: 0,
      moeda: 'USD',
      tag: 'Alimentação',
      descricao: '',
      pay: 'Dinheiro',
      id: sendExp.length + 1,
    });
  }

  render() {
    const { getCoin } = this.props;
    const { moeda, pay, tag, value, descricao } = this.state;
    return (
      <form>
        <Valor value={ value } handleChange={ this.handleChange } />
        <label htmlFor="moeda">
          Moeda:
          <select name="moeda" value={ moeda } id="moeda" onChange={ this.handleChange }>
            {getCoin.map((money, index) => <option key={ index }>{ money }</option>)}
          </select>
        </label>
        <label htmlFor="payment">
          Método de pagamento:
          <select name="pay" id="pay" value={ pay } onChange={ this.handleChange }>
            <option>Dinheiro</option>
            <option>Cartão de crédito</option>
            <option>Cartão de débito</option>
          </select>
        </label>
        <label htmlFor="tag">
          Tag:
          <select name="tag" id="tag" onChange={ this.handleChange } value={ tag }>
            <option>Alimentação</option>
            <option>Lazer</option>
            <option>Trabalho</option>
            <option>Transporte</option>
            <option>Saúde</option>
          </select>
        </label>
        <label htmlFor="descricao">
          Descrição:
          <input
            id="descricao"
            type="text"
            name="descricao"
            value={ descricao }
            placeholder="Digite a descrição do produto"
            onChange={ this.handleChange }
          />
        </label>
        <button
          type="button"
          onClick={ this.handleClick }
        >
          Adicionar despesa
        </button>
      </form>
    );
  }
}

const mapStateToProps = (state) => ({
  getCoin: state.wallet.currencies,
  sendExp: state.wallet.expenses,
});

const mapDispatchToProps = (dispatch) => ({
  sendExpense: (exp) => dispatch(fetchExpense(exp)),
});

Form.propTypes = ({
  getCoin: PropTypes.arrayOf(PropTypes.string),
  sendExpense: PropTypes.func,
}).isRequired;

export default connect(mapStateToProps, mapDispatchToProps)(Form);
