import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { fetchExpense } from '../actions/walletActions';
import FormsDescr from './FormsDescr';
import FormValue from './FormValue';

class Forms extends Component {
  constructor({ getExpenses }) {
    super({ getExpenses });
    this.state = {
      id: getExpenses.length || 0,
      value: 0,
      description: '',
      currency: 'USD',
      method: 'Dinheiro',
      tag: 'Alimentação',
    };
    this.handleChanges = this.handleChanges.bind(this);
    this.handleButton = this.handleButton.bind(this);
  }

  handleChanges({ target }) {
    const { value, name } = target;
    this.setState({
      [name]: value,
    });
  }

  handleButton() {
    const { sendExpense, getExpenses } = this.props;
    sendExpense(this.state);
    this.setState({
      id: getExpenses.length + 1,
      value: '',
      description: '',
      currency: 'USD',
      method: 'Dinheiro',
      tag: 'Alimentação',
    });
  }

  render() {
    const { getCurrencie } = this.props;
    const { value, description, currency, method, tag } = this.state;
    return (
      <form>
        <FormValue value={ value } handleChanges={ this.handleChanges } />
        <FormsDescr value={ description } handleChanges={ this.handleChanges } />
        <label htmlFor="currency">
          Moeda
          <select
            id="currency"
            name="currency"
            value={ currency }
            onChange={ this.handleChanges }
          >
            { getCurrencie.map((currency1, index) => (
              <option key={ index }>{ currency1 }</option>)) }
          </select>
        </label>
        <label htmlFor="method">
          Método de pagamento
          <select
            id="method"
            name="method"
            value={ method }
            onChange={ this.handleChanges }
          >
            <option value="Dinheiro">Dinheiro</option>
            <option value="Cartão de crédito">Cartão de crédito</option>
            <option value="Cartão de débito">Cartão de débito</option>
          </select>
        </label>
        <label htmlFor="tag">
          Tag
          <select id="tag" name="tag" value={ tag } onChange={ this.handleChanges }>
            <option value="Alimentação">Alimentação</option>
            <option value="Lazer">Lazer</option>
            <option value="Trabalho">Trabalho</option>
            <option value="Transporte">Transporte</option>
            <option value="Saúde">Saúde</option>
          </select>
        </label>
        <button type="button" onClick={ this.handleButton }>Adicionar despesa</button>
      </form>
    );
  }
}

const mapStateToProps = (state) => ({
  getCurrencie: state.wallet.currencies, // array de objetos chega
  getExpenses: state.wallet.expenses,
});

const mapDispatchToProps = (dispatch) => ({
  sendExpense: (allExpenses) => dispatch(fetchExpense(allExpenses)),
});

Forms.propTypes = {
  getCurrencie: PropTypes.arrayOf(PropTypes.string).isRequired,
  getExpenses: PropTypes.arrayOf(PropTypes.object).isRequired,
  sendExpense: PropTypes.func.isRequired,
};
export default connect(mapStateToProps, mapDispatchToProps)(Forms);
