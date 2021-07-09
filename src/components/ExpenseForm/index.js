import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import LabelledInput from '../LabelledInput';
import LabelledSelect from '../LabelledSelect';
import { fetchCurrencies } from '../../actions';
import { cloneObject } from '../../helpers/utils';

const paymentOptions = [
  { label: 'Dinheiro', value: 'Dinheiro' },
  { label: 'Cartão de crédito', value: 'Cartão de crédito' },
  { label: 'Cartão de débito', value: 'Cartão de débito' },
];

const tagOptions = [
  { label: 'Alimentação', value: 'Alimentação' },
  { label: 'Lazer', value: 'Lazer' },
  { label: 'Trabalho', value: 'Trabalho' },
  { label: 'Transporte', value: 'Transporte' },
  { label: 'Saúde', value: 'Saúde' },
];

const baseURL = 'https://economia.awesomeapi.com.br/json/all';

const currencyCodes = [
  'USD', 'CAD', 'EUR', 'GBP', 'ARS', 'BTC', 'LTC',
  'JPY', 'CHF', 'AUD', 'CNY', 'ILS', 'ETH', 'XRP',
];

const initialState = {
  value: 0,
  description: '',
  currency: '',
  method: paymentOptions[0].value,
  tag: tagOptions[0].value,
  currencyOptions: [],
};

class ExpenseForm extends React.Component {
  constructor() {
    super();

    this.state = { ...initialState };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    this.fetchCurrencies();
  }

  handleChange({ name, value }) {
    this.setState({
      [name]: value,
    });
  }

  async fetchCurrencies() {
    const response = await fetch(baseURL);
    const data = await response.json();
    const currencies = Object.entries(data);

    const filteredCurrencies = currencies.reduce(
      (filtered, [key, value]) => {
        if (currencyCodes.includes(key)) {
          filtered.push({
            label: value.code,
            value: value.code,
          });
        }

        return filtered;
      },
      [],
    );

    this.setState({
      currency: filteredCurrencies[0].value,
      currencyOptions: filteredCurrencies,
    });
  }

  resetState() {
    this.setState(({ currencyOptions }) => ({
      ...initialState,
      currency: currencyOptions[0].value,
      currencyOptions,
    }));
  }

  handleSubmit() {
    const stateClone = cloneObject(this.state);
    const { newExpense } = this.props;

    delete stateClone.currencyOptions;

    newExpense(stateClone);

    this.resetState();
  }

  render() {
    const { value, description, currency, method, tag, currencyOptions } = this.state;

    return (
      <form>
        <LabelledInput
          id="value"
          label="Valor"
          type="number"
          value={ value }
          onChange={ this.handleChange }
        />
        <LabelledInput
          id="description"
          label="Descrição"
          value={ description }
          onChange={ this.handleChange }
        />
        <LabelledSelect
          id="currency"
          label="Moeda"
          options={ currencyOptions }
          value={ currency }
          onChange={ this.handleChange }
        />
        <LabelledSelect
          id="method"
          label="Método de pagamento"
          options={ paymentOptions }
          value={ method }
          onChange={ this.handleChange }
        />
        <LabelledSelect
          id="tag"
          label="Tag"
          options={ tagOptions }
          value={ tag }
          onChange={ this.handleChange }
        />
        <button type="button" onClick={ this.handleSubmit }>Adicionar despesa</button>
      </form>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  newExpense: (payload) => dispatch(fetchCurrencies(payload)),
});

export default connect(null, mapDispatchToProps)(ExpenseForm);

ExpenseForm.propTypes = {
  newExpense: PropTypes.func,
}.isRequired;
