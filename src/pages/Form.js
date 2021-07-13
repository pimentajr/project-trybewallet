import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Description from './Description';
import { addExpenses } from '../actions';

class Form extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: 0,
      description: '',
      currency: 'USD',
      method: 'Dinheiro',
      tag: 'Alimentação',
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  handleChange({ target }) {
    const { name, value } = target;
    this.setState({ [name]: value });
  }

  handleClick() {
    const { submitExpense } = this.props;
    submitExpense(this.state);
  }

  render() {
    const { otherFetch } = this.props;
    const { value, currency, method, tag } = this.state;
    const func = this.handleChange;
    return (
      <form>
        <label htmlFor="value">
          Valor:
          <input
            type="number"
            id="value"
            value={ value }
            name="value"
            onChange={ func }
          />
        </label>
        <label htmlFor="currency">
          Moeda:
          <select id="currency" name="currency" value={ currency } onChange={ func }>
            {otherFetch.map((coin, index) => (<option key={ index }>{ coin }</option>))}
          </select>
        </label>
        <label htmlFor="method">
          Método de pagamento:
          <select name="method" id="method" value={ method } onChange={ func }>
            <option>Dinheiro</option>
            <option>Cartão de crédito</option>
            <option>Cartão de débito</option>
          </select>
        </label>
        <label htmlFor="tag">
          Tag:
          <select name="tag" id="tag" value={ tag } onChange={ func }>
            <option>Alimentação</option>
            <option>Lazer</option>
            <option>Trabalho</option>
            <option>Transporte</option>
            <option>Saúde</option>
          </select>
        </label>
        <Description handleChange={ func } />
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

const mapDispatchToProps = (dispatch) => ({
  submitExpense: (expense) => dispatch(addExpenses(expense)),
});

const mapStateToProps = (state) => ({
  otherFetch: state.wallet.currencies,
  expenses: state.wallet.expense,
});

Form.propTypes = ({
  otherFetch: PropTypes.arrayOf(PropTypes.string),
  submitExpense: PropTypes.func,
}).isRequired;

export default connect(mapStateToProps, mapDispatchToProps)(Form);
