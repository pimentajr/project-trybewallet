import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Head from '../components/WalletHeader';
import { fetchApiRequest, fetchAPIExpense } from '../actions';

class Wallet extends React.Component {
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
    this.handleChanges = this.handleChanges.bind(this);
    this.AddExpense = this.AddExpense.bind(this);
  }

  componentDidMount() {
    const { FetchApi } = this.props;
    FetchApi();
  }

  getTotal(expenses) {
    const total = (expenses.length === 0) ? 0 : expenses
      .reduce((acc, cur) => acc + cur.value * cur.exchangeRates[cur.currency].ask, 0);

    return total.toFixed(2);
  }

  optionCreator(coinApi) {
    return Object.keys(coinApi).map((coin, index) => (
      coin !== 'USDT' ? <option key={ index } value={ coin }>{coin}</option>
        : null
    ));
  }

  AddExpense() {
    const { addExpense, expenses } = this.props;
    const expensesLength = expenses.length;
    addExpense(this.state);

    if (expensesLength >= 0) {
      this.setState({ id: expensesLength + 1 });
    }
  }

  handleChanges({ target }) {
    const { value, name } = target;
    this.setState({
      [name]: value,
    });
  }

  render() {
    const { coinApi, email, expenses } = this.props;
    return (
      <div>
        <Head email={ email } total={ this.getTotal(expenses) } />
        <form>
          <label htmlFor="valu">
            valor
            <input type="number" id="valu" name="value" onChange={ this.handleChanges } />
          </label>
          <label htmlFor="description">
            Descrição
            <input
              type="text"
              id="description"
              name="description"
              onChange={ this.handleChanges }
            />
          </label>
          <label htmlFor="currency">
            Moeda
            <select id="currency" name="currency" onChange={ this.handleChanges }>
              { this.optionCreator(coinApi) }
            </select>
          </label>
          <label htmlFor="method">
            Método de pagamento
            <select id="method" name="method" onChange={ this.handleChanges }>
              <option value="Dinheiro">Dinheiro</option>
              <option value="Cartão de crédito">Cartão de crédito</option>
              <option value="Cartão de débito">Cartão de débito</option>
            </select>
          </label>
          <label htmlFor="tag">
            Tag
            <select id="tag" name="tag" onChange={ this.handleChanges }>
              <option>Alimentação</option>
              <option>Lazer</option>
              <option>Trabalho</option>
              <option>Transporte</option>
              <option>Saúde</option>
            </select>
          </label>
          <button type="button" onClick={ this.AddExpense }>Adicionar Despesa</button>
        </form>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  email: state.user.email,
  coinApi: state.wallet.currencies,
  expenses: state.wallet.expenses,
});
Wallet.propTypes = {
  email: PropTypes.string.isRequired,
  FetchApi: PropTypes.func.isRequired,
  coinApi: PropTypes.objectOf(PropTypes.any).isRequired,
  expenses: PropTypes.arrayOf(PropTypes.any).isRequired,
  addExpense: PropTypes.func.isRequired,
};
const mapDispatchToProps = (dispatch) => ({
  FetchApi: (state) => dispatch(fetchApiRequest(state)),
  addExpense: (expense) => dispatch(fetchAPIExpense(expense)) });
export default connect(mapStateToProps, mapDispatchToProps)(Wallet);
