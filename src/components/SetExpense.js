import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import getCurrency from '../services/APIservice';
import Method from '../Method';
import Tag from '../Tag';
import { setCurrency, fetchExchangesRatesApi } from '../actions';

class EnterExpense extends React.Component {
  constructor() {
    super();
    this.state = {
      value: '',
      description: '',
      currency: '',
      method: '',
      tag: '',
    };
    this.getCurrency = this.getCurrency.bind(this);
    this.currencyOptions = this.currencyOptions.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.createExpense = this.createExpense.bind(this);
    this.saveExpense = this.saveExpense.bind(this);
  }

  componentDidMount() {
    getCurrency().then((result) => this.getCurrency(result));
  }

  getCurrency(currencies) {
    const { saveApiCurrencies } = this.props;
    const currList = Object.keys(currencies).filter((currency) => currency !== 'USDT');
    saveApiCurrencies(currList);
  }

  currencyOptions() {
    const { wallet: { currencies } } = this.props;
    return currencies.map((currency, index) => (
      <option
        key={ index }
        value={ currency }
      >
        { currency }
      </option>
    ));
  }

  handleChange({ target }) {
    const { name, value } = target;
    this.setState({
      [name]: value,
    });
  }

  createExpense() {
    const { wallet } = this.props;
    const { value, description, currency, method, tag } = this.state;
    const id = wallet.expenses.length;
    const expenseObject = {
      id,
      value,
      description,
      currency,
      method,
      tag,
      exchangeRates: {},
    };
    return expenseObject;
  }

  saveExpense() {
    const { saveExpense } = this.props;
    const actualExpense = this.createExpense();
    saveExpense(actualExpense);
    this.setState({
      value: '',
      description: '',
      currency: '',
      method: '',
      tag: '',
    });
  }

  render() {
    const { value, description, currency, method, tag } = this.state;
    return (
      <form className="form-input-expense">
        <label htmlFor="valor">
          Valor:
          <input
            type="number"
            id="valor"
            name="value"
            min="0"
            onChange={ (e) => this.handleChange(e) }
            value={ value }
          />
        </label>
        <label htmlFor="descrição">
          Descrição:
          <input
            id="descrição"
            type="text"
            name="description"
            onChange={ (e) => this.handleChange(e) }
            value={ description }
          />
        </label>
        <label htmlFor="moeda">
          Moeda:
          <select
            id="moeda"
            name="currency"
            onChange={ (e) => this.handleChange(e) }
            value={ currency }
          >
            { this.currencyOptions() }
          </select>
        </label>
        <Method value={ method } handleChange={ this.handleChange } />
        <Tag value={ tag } handleChange={ this.handleChange } />
        <button
          type="button"
          onClick={ () => this.saveExpense() }
        >
          Adicionar despesa
        </button>
      </form>
    );
  }
}

const mapStateToProps = (state) => ({ wallet: state.wallet });

const mapDispatchToProps = (dispatch) => ({
  saveExpense: (expense) => dispatch(fetchExchangesRatesApi(expense)),
  saveApiCurrencies: (currencies) => dispatch(setCurrency(currencies)),
});

export default connect(mapStateToProps, mapDispatchToProps)(EnterExpense);

EnterExpense.propTypes = {
  saveExpense: PropTypes.func.isRequired,
  saveApiCurrencies: PropTypes.func.isRequired,
  wallet: PropTypes.arrayOf(
    PropTypes.string,
    PropTypes.number,
  ),
};

EnterExpense.defaultProps = {
  wallet: [],
};
