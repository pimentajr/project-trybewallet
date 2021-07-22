import React, { Component } from 'react';
import { connect } from 'react-redux';
import propTypes from 'prop-types';
import { apiFetching } from '../actions';

class DispensesForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: 0,
      dsc: '',
      currency: '',
      method: '',
      tag: '',
    };
    this.inputSave = this.inputSave.bind(this);
  }

  inputSave({ target }) {
    this.setState({ [target.id]: target.value });
  }

  render() {
    const { currencies } = this.props;
    const { value, dsc, currency, method, tag } = this.state;
    const currencyObject = Object.keys(currencies).filter((curr) => curr !== 'USDT');
    return (
      <form>
        <label htmlFor="value" name="value">
          Valor
          <input type="text" id="value" value={ value } onChange={ this.inputSave } />
        </label>
        <label htmlFor="description">
          Descrição:
          <input type="text" id="description" value={ dsc } onChange={ this.inputSave } />
        </label>
        <label htmlFor="currency" name="currency">
          Moeda
          <select id="currency" value={ currency } onChange={ this.inputSave }>
            {currencyObject.map((moneyType) => (
              <option key={ moneyType } value={ moneyType }>
                { moneyType }
              </option>
            ))}
          </select>
        </label>
        <label htmlFor="method">
          Método de pagamento
          <select id="method" name="method" value={ method } onChange={ this.inputSave }>
            <option value="Dinheiro">Dinheiro</option>
            <option value="Cartão de crédito">Cartão de crédito</option>
            <option value="Cartão de débito">Cartão de débito</option>
          </select>
        </label>
        <label htmlFor="tag">
          Tag
          <select id="tag" name="tag" value={ tag } onChange={ this.inputSave }>
            <option value="Alimentação">Alimentação</option>
            <option value="Lazer">Lazer</option>
            <option value="Trabalho">Trabalho</option>
            <option value="Transporte">Transporte</option>
            <option value="Saúde">Saúde</option>
          </select>
        </label>
      </form>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  currenciesFromAPI: () => dispatch(apiFetching()),
});

const mapStateToProps = ({ wallet: { currencies, dispenses } }) => ({
  currencies,
  dispenses,
});

DispensesForm.propTypes = {
  currencies: propTypes.array,
}.isRequired;

export default connect(mapStateToProps, mapDispatchToProps)(DispensesForm);
