import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchCoins, addExpensesSuccess } from '../actions';

import InitialCoins from '../components/InitialCoins';

class Form extends React.Component {
  constructor() {
    super();
    this.state = {
      id: 0,
      value: 0,
      description: '',
      currency: 'USD',
      method: 'Cartão de crédito',
      tag: 'Alimentação',
    };
    this.handleChange = this.handleChange.bind(this);
    this.submitData = this.submitData.bind(this);
  }

  componentDidMount() {
    const { sendCoins } = this.props;
    return sendCoins();
  }

  handleChange({ target }) {
    const { name, value } = target;
    this.setState({
      [name]: value,
    });
  }

  submitData() {
    const { sendData, stateMoney, sendCoins } = this.props;
    sendCoins();
    sendData({ ...this.state, exchangeRates: stateMoney });
    this.setState((sumId) => ({
      id: sumId.id + 1,
    }));
  }

  render() {
    return (
      <form>
        <label htmlFor="value-input">
          Valor
          <input
            type="number"
            name="value"
            id="value-input"
            onChange={ this.handleChange }
          />
        </label>
        <label htmlFor="description-input">
          Descrição
          <input
            type="text"
            onChange={ this.handleChange }
            name="description"
            id="description-input"
          />
        </label>
        <label htmlFor="coin-input">
          Moeda
          <select id="coin-input" onChange={ this.handleChange } name="currency">
            <InitialCoins />
          </select>
        </label>
        <label htmlFor="pay-input">
          Método de pagamento
          <select id="pay-input" onChange={ this.handleChange } name="method">
            <option>Cartão de crédito</option>
            <option>Dinheiro</option>
            <option>Cartão de débito</option>
          </select>
        </label>
        <label htmlFor="tag-input">
          Tag
          <select id="tag-input" onChange={ this.handleChange } name="tag">
            <option>Alimentação</option>
            <option>Lazer</option>
            <option>Trabalho</option>
            <option>Transporte</option>
            <option>Saúde</option>
          </select>
        </label>
        <button type="button" onClick={ this.submitData }>Adicionar despesa</button>
      </form>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  sendCoins: () => dispatch(fetchCoins()),
  sendData: (state) => dispatch(addExpensesSuccess(state)),
});

const mapStateToProps = (state) => ({
  stateMoney: state.wallet.money,
});

Form.propTypes = ({
  askCoin: PropTypes.arrayOf,
}).isRequired;

export default connect(mapStateToProps, mapDispatchToProps)(Form);
