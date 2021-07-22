import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Header from '../components/header';
import fetchAPI from '../services/index';
import { successFetch, addExpense } from '../actions';
import FormName from '../components/formName';
import FormSelect from '../components/formSelect';
import Table from '../components/table';

class Wallet extends React.Component {
  constructor() {
    super();
    this.state = {
      currency: 'USD',
      description: '',
      exchangeRates: {},
      id: 0,
      method: 'Dinheiro',
      tag: 'Alimentação',
      value: '0',
    };

    this.renderCurrency = this.renderCurrency.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  componentDidMount() {
    this.renderCurrency();
  }

  handleChange({ target }) {
    const { name, value } = target;
    this.setState({
      [name]: value,
    });
  }

  handleClick() {
    this.renderCurrency();
    const { expense } = this.props;
    this.setState((state) => ({
      id: state.id + 1,
    }));
    expense(this.state);
  }

  async renderCurrency() {
    const { walletCurrency } = this.props;
    const currencies = await fetchAPI();
    const filterUsd = Object.keys(currencies).filter((coin) => coin !== 'USDT');
    walletCurrency(
      filterUsd,
    );

    this.setState({
      exchangeRates: currencies,
    });
  }

  render() {
    return (
      <main>
        <Header />
        <form>
          <FormName onChang={ this.handleChange } />
          <FormSelect onChang={ this.handleChange } />
          <button
            name="button"
            type="button"
            onClick={ () => this.handleClick() }
          >
            Adicionar despesa
          </button>
        </form>
        <Table />
      </main>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  walletCurrency: (coin) => dispatch(successFetch(coin)),
  expense: (expense) => dispatch(addExpense(expense)),
});

const mapStateToProps = (state) => ({
  currencies: state.wallet.currencies,
});

export default connect(mapStateToProps, mapDispatchToProps)(Wallet);

Wallet.propTypes = {
  expense: PropTypes.func,
  walletCurrency: PropTypes.func,
}.isRequired;
