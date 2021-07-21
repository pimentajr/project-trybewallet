import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { fetchCurrency, addExpence, removeExpense } from '../actions';

class Wallet extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: '',
      description: '',
      currency: 'USD',
      method: 'Dinheiro',
      tag: 'Alimentação',
    };
    this.expencesSubmit = this.expencesSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    const { fetchCoins } = this.props;
    fetchCoins();
  }

  handleChange({ target }) {
    const { name, value } = target;
    this.setState({
      [name]: value,
    });
  }

  expencesSubmit(event) {
    const { value, description, currency, method, tag } = this.state;
    const expense = { value, description, currency, method, tag };
    const { addButton } = this.props;

    addButton(expense);

    this.setState({
      value: '',
      description: '',
      currency: 'USD',
      method: 'Dinheiro',
      tag: 'Alimentação',
    });
    event.preventDefault();
  }

  header() {
    const { expense, userEmail } = this.props;
    const total = expense.length > 0
      ? expense.reduce((acc, curr) => (
        acc + (curr.value * curr.exchangeRates[curr.currency].ask)), 0) : 0;
    return (
      <header>
        <p data-testid="email-field">{userEmail}</p>
        <p data-testid="total-field">{total}</p>
        <p data-testid="header-currency-field">BRL</p>
      </header>);
  }

  noSelectForm() {
    const { value, description } = this.state;
    return (
      <div>
        <form>
          <label htmlFor>
            Valor:
            <input
              type="text"
              name="value"
              value={ value }
              onChange={ this.handleChange }
            />
          </label>
          <label htmlFor>
            Descrição:
            <input
              type="text"
              name="description"
              value={ description }
              onChange={ this.handleChange }
            />
          </label>
        </form>
      </div>);
  }

  tableExpenses() {
    const { expense, remove } = this.props;
    return (
      <div>
        <table>
          <tr>
            <th>Descrição</th>
            <th>Tag</th>
            <th>Método de pagamento</th>
            <th>Valor</th>
            <th>Moeda</th>
            <th>Câmbio utilizado</th>
            <th>Valor convertido</th>
            <th>Moeda de conversão</th>
            <th>Editar/Excluir</th>
          </tr>
          {expense.length > 0 && expense.map((expenses, index) => {
            const coin = Object.entries(expenses.exchangeRates)
              .find(([key]) => key === expenses.currency)[1];
            return (
              <tr key={ index }>
                <td>{expenses.description}</td>
                <td>{expenses.tag}</td>
                <td>{expenses.method}</td>
                <td>{expenses.value}</td>
                <td>{coin.name.split('/')[0]}</td>
                <td>{Number(coin.ask).toFixed(2)}</td>
                <td>{(Number(expenses.value) * Number(coin.ask)).toFixed(2)}</td>
                <td>Real</td>
                <td>
                  <button
                    type="button"
                    data-testid="delete-btn"
                    onClick={ () => remove(index) }
                  >
                    Excluir
                  </button>
                  <button type="button" data-testid="edit-btn">
                    Editar
                  </button>
                </td>
              </tr>
            );
          })}
        </table>
      </div>
    );
  }

  render() {
    const { currencie } = this.props;
    const { currency, method, tag } = this.state;
    return (
      <div>
        {this.header()}
        {this.noSelectForm()}
        <form>
          <label htmlFor>
            Moeda:
            <select name="currency" value={ currency } onChange={ this.handleChange }>
              {currencie.map((coin) => (
                <option key={ coin } value={ coin }>{coin}</option>
              ))}
            </select>
          </label>
          <label htmlFor>
            Método de Pagamento:
            <select name="method" value={ method } onChange={ this.handleChange }>
              <option>Dinheiro</option>
              <option>Cartão de crédito</option>
              <option>Cartão de débito</option>
            </select>
          </label>
          <label htmlFor>
            Tag:
            <select name="tag" value={ tag } onChange={ this.handleChange }>
              <option>Alimentação</option>
              <option>Lazer</option>
              <option>Trabalho</option>
              <option>Transporte</option>
              <option>Saúde</option>
            </select>
          </label>
          <button type="submit" onClick={ this.expencesSubmit }>Adicionar despesa</button>
        </form>
        {this.tableExpenses()}
      </div>);
  }
}

const mapStateToProps = (state) => ({
  userEmail: state.user.email,
  currencie: state.wallet.currencies,
  expense: state.wallet.expenses });

const mapDispatchToProps = (dispatch) => ({
  fetchCoins: () => dispatch(fetchCurrency()),
  addButton: (data) => dispatch(addExpence(data)),
  remove: (id) => dispatch(removeExpense(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Wallet);

Wallet.propTypes = {
  userEmail: PropTypes.string,
}.isRequired;
