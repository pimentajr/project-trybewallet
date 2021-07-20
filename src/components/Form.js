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
    const save = this.handleChance;
    return (
      <div>
        <form>
          <label htmlFor="vl">
            Valor
            <input id="vl" value={ value } type="number" name="value" onChange={ save } />
          </label>
          <label htmlFor="desc">
            Descrição
            <input
              id="desc"
              type="text"
              name="description"
              value={ description }
              onChange={ save }
            />
          </label>
          <label htmlFor="moeda">
            Moeda
            <select id="moeda" name="currency" value={ currency } onChange={ save }>
              {!currencies
                ? <option value="BRL">BRL</option>
                : currencies.map((currenc) => (
                  <option key={ currenc } value={ currenc }>{ currenc }</option>
                ))}
            </select>
          </label>
          <label htmlFor="metodo">
            Método de pagamento
            <select id="metodo" name="method" value={ method } onChange={ save }>
              <option>Dinheiro</option>
              <option>Cartão de crédito</option>
              <option>Cartão de débito</option>
            </select>
          </label>
          <label htmlFor="tag">
            Tag
            <select id="tag" name="tag" value={ tag } onChange={ save }>
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
