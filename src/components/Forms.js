import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getCurrenciesThunk } from '../actions';

class Forms extends Component {
  constructor() {
    super();

    this.inputRender = this.inputRender.bind(this);
    this.optionsCurrencies = this.optionsCurrencies.bind(this);
  }

  componentDidMount() {
    const { setCurrencies } = this.props;
    setCurrencies();
  }

  inputRender(label, name, type) {
    return (
      <label htmlFor={ `${name}-input` }>
        { label }
        <input
          type={ type }
          name={ name }
          id={ `${name}-input` }
        />
      </label>
    );
  }

  optionsCurrencies() {
    const { getOptionsCurrencies } = this.props;
    return (
      <select
        id="currency-input"
        name="currency"
      >
        {getOptionsCurrencies.map((currency) => {
          if (currency === 'USDT') return '';
          return (
            <option key={ currency }>
              {currency}
            </option>
          );
        })}
      </select>
    );
  }

  render() {
    return (
      <form>
        {this.inputRender('Valor:', 'value', 'number')}
        {this.inputRender('Descrição:', 'description', 'text')}
        <label htmlFor="currency-input">
          Moeda:
          {this.optionsCurrencies()}
        </label>
        <label htmlFor="method-input">
          Método de pagamento:
          <select
            id="method-input"
          >
            <option>Dinheiro</option>
            <option>Cartão de crédito</option>
            <option>Cartão de débito</option>
          </select>
        </label>
        <label htmlFor="tag-input">
          Tag:
          <select
            id="tag-input"
          >
            <option>Alimentação</option>
            <option>Lazer</option>
            <option>Trabalho</option>
            <option>Transporte</option>
            <option>Saúde</option>
          </select>
        </label>
        <button type="submit">Adicionar Despesas</button>
      </form>
    );
  }
}

const mapStateToProps = (state) => ({
  getOptionsCurrencies: state.wallet.currencies,
});

const mapDispatchToPros = (dispatch) => ({
  setCurrencies: () => dispatch(getCurrenciesThunk()),
});

export default connect(mapStateToProps, mapDispatchToPros)(Forms);

Forms.propTypes = {
  getOptionsCurrencies: PropTypes.arrayOf(PropTypes.string).isRequired,
  setCurrencies: PropTypes.func.isRequired,
};
