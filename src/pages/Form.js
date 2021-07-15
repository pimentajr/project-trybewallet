import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { newExpenses } from '../actions';
import Inputs from '../components/Inputs';

class Form extends Component {
  constructor() {
    super();
    this.state = {
      currencies: [],
      id: 0,
      value: 0,
      description: '',
      currency: 'USD',
      method: 'Dinheiro',
      tag: 'Alimentação',
      exchangeRates: {},
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange({ target: { id, value } }) {
    this.setState({
      [id]: value,
    });
  }

  render() {
    const { sendExpense, currencies } = this.props;

    return (
      <form>
        <Inputs handleChange={ this.handleChange } />

        <label htmlFor="method">
          Método de pagamento
          <select id="method" onChange={ this.handleChange }>
            <option key="Dinheiro">Dinheiro</option>
            <option key="Cartão de crédito">Cartão de crédito</option>
            <option key="Cartão de débito">Cartão de débito</option>
          </select>
        </label>
        <label htmlFor="tag">
          Tag
          <select id="tag" onChange={ this.handleChange }>
            <option key="Alimentação">Alimentação</option>
            <option key="Lazer">Lazer</option>
            <option key="Trabalho">Trabalho</option>
            <option key="Transporte">Transporte</option>
            <option key="Saúde">Saúde</option>
          </select>
        </label>
        <button
          type="button"
          onClick={ () => {
            sendExpense({ ...this.state, exchangeRates: currencies[0] });
            this.setState((prevState) => ({ id: prevState.id + 1 }));
          } }
        >
          Adicionar despesa
        </button>
      </form>
    );
  }
}

const mapStateToProps = (state) => ({
  currencies: state.wallet.currencies,
});

const mapDispatchToProps = (dispatch) => ({
  sendExpense: (obj) => dispatch(newExpenses(obj)),
});

Form.propTypes = {
  sendExpense: PropTypes.func.isRequired,
  currencies: PropTypes.arrayOf(Object).isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Form);
