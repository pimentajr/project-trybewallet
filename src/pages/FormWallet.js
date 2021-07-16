import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchCoins, fetchCoinsOnApi, newExpense } from '../actions';
import CurrentType from '../components/CurrentType';

class FormWallet extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: 0,
      value: '10',
      description: '',
      currency: 'USD',
      method: 'Cartão de crédito',
      tag: 'Alimentação',
    };
    this.handleChange = this.handleChange.bind(this);
    this.clickSubmit = this.clickSubmit.bind(this);
  }

  componentDidMount() {
    const { dispatchFetchCoins, fetchCurrent } = this.props;
    dispatchFetchCoins();
    fetchCurrent();
  }

  handleChange({ target }) {
    const { name, value } = target;
    this.setState({
      [name]: value,
    });
  }

  clickSubmit() {
    const { newExpenses } = this.props;
    const { id } = this.state;
    this.setState({ id: id + 1 });
    newExpenses(this.state);
    console.log('alo');
  }

  render() {
    return (
      <form>
        <label htmlFor="value">
          Valor:
          <input name="value" type="text" id="value" onChange={ this.handleChange } />
        </label>
        <label htmlFor="description">
          Descrição:
          <input
            name="description"
            type="text"
            id="description"
            onChange={ this.handleChange }
          />
        </label>
        <label htmlFor="currency">
          Moeda:
          <select name="currency" id="currency" onChange={ this.handleChange }>
            <CurrentType />
          </select>
        </label>
        <label htmlFor="method">
          Método de pagamento:
          <select name="method" id="method" onChange={ this.handleChange }>
            <option>Dinheiro</option>
            <option>Cartão de crédito</option>
            <option>Cartão de débito</option>
          </select>
        </label>
        <label htmlFor="tag">
          Tag:
          <select name="tag" id="tag" onChange={ this.handleChange }>
            <option value="Alimentação">Alimentação</option>
            <option value="Lazer">Lazer</option>
            <option value="Trabalho">Trabalho</option>
            <option value="Transporte">Transporte</option>
            <option value="Saúde">Saúde</option>
          </select>
        </label>
        <button
          type="button"
          onClick={ this.clickSubmit }
        >
          Adicionar despesa
        </button>
      </form>
    );
  }
}

FormWallet.propTypes = {
  dispatchFetchCoins: PropTypes.func.isRequired,
  fetchCurrent: PropTypes.func.isRequired,
  newExpenses: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  dispatchFetchCoins: (state) => dispatch(fetchCoins(state)),
  fetchCurrent: () => dispatch(fetchCoinsOnApi()),
  newExpenses: (expense) => dispatch(newExpense(expense)),
});

export default connect(null, mapDispatchToProps)(FormWallet);
