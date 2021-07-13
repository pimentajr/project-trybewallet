import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Valor from './Valor';
import { fetchExpense } from '../actions';
import Description from './Description';

class Form extends Component {
  constructor({ sendExp }) {
    super({ sendExp });
    this.state = {
      value: 0,
      currency: 'USD',
      tag: 'Alimentação',
      description: '',
      method: 'Dinheiro',
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
      currency: 'USD',
      tag: 'Alimentação',
      description: '',
      method: 'Dinheiro',
      id: sendExp.length + 1,
    });
  }

  render() {
    const { getCoin } = this.props;
    const { currency, method, tag, value, description } = this.state;
    return (
      <form>
        <Valor value={ value } handleChange={ this.handleChange } />
        <label htmlFor="moeda">
          Moeda:
          <select
            name="currency"
            value={ currency }
            id="moeda"
            onChange={ this.handleChange }
          >
            {getCoin.map((money, index) => <option key={ index }>{ money }</option>)}
          </select>
        </label>
        <label htmlFor="method">
          Método de pagamento:
          <select
            name="method"
            value={ method }
            id="method"
            onChange={ this.handleChange }
          >
            <option value="Dinheiro">Dinheiro</option>
            <option value="Cartão de crédito">Cartão de crédito</option>
            <option value="Cartão de débito">Cartão de débito</option>
          </select>
        </label>
        <label htmlFor="tag">
          Tag:
          <select name="tag" id="tag" value={ tag } onChange={ this.handleChange }>
            <option value="Alimentação">Alimentação</option>
            <option value="Lazer">Lazer</option>
            <option value="Trabalho">Trabalho</option>
            <option value="Transporte">Transporte</option>
            <option value="Saúde">Saúde</option>
          </select>
        </label>
        <Description value={ description } handleChange={ this.handleChange } />
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
