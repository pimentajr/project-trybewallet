import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { fetchExchangeRates } from '../actions';

class Forms extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: 0,
      value: 0,
      description: '',
      currency: 'USD',
      method: 'Dinheiro',
      tag: 'Alimentação',
    };
    this.handlerChanges = this.handlerChanges.bind(this);
    this.initialState = this.initialState.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.clickSubmit = this.clickSubmit.bind(this);
  }

  initialState() {
    const state = {
      currency: 'USD',
      method: 'Dinheiro',
      tag: 'Alimentação',
    };
    return this.setState(state);
  }

  handlerChanges({ target: { value, id } }) {
    this.setState({
      [id]: value,
    });
  }

  handleChange({ target }) {
    const { name, value } = target;
    this.setState({
      [name]: value,
    });
  }

  clickSubmit() {
    const { id } = this.state;
    const { newExpense } = this.props;
    this.setState({ id: id + 1 });
    newExpense(this.state);
  }

  /* renderImput() {
    return (
      <label htmlFor="tag" id="tag" name="tag">
        Tag:
        <select id="tag" onChange={ this.handlerChanges }>
          <option value="Alimentação">Alimentação</option>
          <option value="Lazer">Lazer</option>
          <option value="Transporte">Transporte</option>
          <option value="Saúde">Saúde</option>
        </select>
      </label>
    );
   }  */

  render() {
    const { getcurrenciesFromStore } = this.props;
    return (
      <div>
        <form className="forms" id="forms">
          <label htmlFor="value">
            Valor:
            <input onChange={ this.handleChange } type="number" id="value" name="value" />
          </label>
          <label htmlFor="description">
            Descrição:
            <textarea
              name="description"
              id="description"
              onChange={ this.handleChange }
            />
          </label>
          <label htmlFor="currency">
            Moeda:
            <select id="currency" onChange={ this.handleChange } name="currency">
              {getcurrenciesFromStore
                .map((item, index) => <option key={ index }>{ item }</option>)}
            </select>
          </label>
          <label htmlFor="method">
            Método de pagamento:
            <select id="method" onChange={ this.handleChange } name="method">
              <option value="Dinheiro">Dinheiro</option>
              <option value="Cartão de crédito">Cartão de crédito</option>
              <option value="Cartão de débito">Cartão de débito</option>
            </select>
          </label>
          <label htmlFor="tag">
            Tag:
            <select id="tag" onChange={ this.handleChange } name="tag">
              <option>Alimentação</option>
              <option>Lazer</option>
              <option>Trabalho</option>
              <option>Transporte</option>
              <option>Saúde</option>
            </select>
          </label>
          <button type="button" onClick={ this.clickSubmit }>
            Adicionar despesa
          </button>
        </form>
      </div>
    );
  }
}
const mapDispatchToProps = (dispatch) => ({
  newExpense: (expense) => dispatch(fetchExchangeRates(expense)),
});

const mapStateToProps = (state) => ({
  getcurrenciesFromStore: state.wallet.currencies,
});

export default connect(mapStateToProps, mapDispatchToProps)(Forms);

Forms.propTypes = {
  getcurrenciesFromStore: PropTypes.arrayOf(PropTypes.object),
  newExpense: PropTypes.func,
}.isRequired;
