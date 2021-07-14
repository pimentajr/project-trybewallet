import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { expenseAction, fetchCurrencies } from '../actions';
import Inputs from '../form-components/Inputs';
import Selects from '../form-components/Selects';

class Form extends Component {
  constructor(props) {
    super(props);

    this.state = {
      exchangeRates: [],
      value: 0,
      description: '',
      currency: 'USD',
      method: 'Dinheiro',
      tag: 'Alimentação',
      id: 0,
    };
    this.fetchApi = this.fetchApi.bind(this);
    this.changeValues = this.changeValues.bind(this);
    this.createExpense = this.createExpense.bind(this);
  }

  componentDidMount() {
    this.fetchApi();
  }

  changeValues({ target }) {
    const { name, value } = target;
    this.setState({
      [name]: value,
    });
  }

  createExpense() {
    const { value, description, currency, method, tag, id } = this.state;
    this.fetchApi();
    const { setExpense, currencies } = this.props;
    const expense = {
      id,
      value,
      description,
      currency,
      method,
      tag,
      exchangeRates: currencies,
    };
    setExpense(expense);
    this.setState((prev) => ({
      id: prev.id + 1,
      exchangeRates: [],
      value: 0,
      description: '',
      currency: 'USD',
      method: 'Dinheiro',
      tag: 'Alimentação',
    }));
  }

  fetchApi() {
    const { fetchCurrenciesApi } = this.props;
    this.setState(
      async () => {
        await fetchCurrenciesApi();
        const { currencies } = this.props;
        this.setState({
          exchangeRates: currencies,
        });
      },
    );
  }

  render() {
    const { exchangeRates, method, tag, description, currency, value } = this.state;
    const FIFTEEN = 15;
    return (
      <div>
        <form className="forms">
          <Inputs
            value={ value }
            description={ description }
            func={ this.changeValues }
          />
          <Selects
            method={ method }
            tag={ tag }
            currency={ currency }
            currencies={ exchangeRates }
            FIFTEEN={ FIFTEEN }
            func={ this.changeValues }
          />
          <button type="button" onClick={ this.createExpense }>
            Adicionar despesa
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
  fetchCurrenciesApi: () => dispatch(fetchCurrencies()),
  setExpense: (state) => dispatch(expenseAction(state)),
});

Form.propTypes = {
  fetchCurrenciesApi: PropTypes.func.isRequired,
  currencies: PropTypes.arrayOf(String).isRequired,
  setExpense: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Form);
