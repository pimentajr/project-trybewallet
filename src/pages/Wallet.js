import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { fetchPosts, changeExpense } from '../actions';
import Table from '../components/Table';

const Alimentacao = 'Alimentação';
let btnName = false;

class Wallet extends Component {
  constructor(props) {
    super(props);

    const { expenses } = this.props;
    this.state = {
      id: expenses.length,
      value: '',
      description: '',
      currency: 'USD',
      method: 'Dinheiro',
      tag: Alimentacao,
      exchangeRates: {},
    };
    this.form = this.form.bind(this);
    this.change = this.change.bind(this);
    this.editForm = this.editForm.bind(this);
    this.submitChange = this.submitChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  componentDidMount() {
    const { dispatchFetchPosts } = this.props;
    dispatchFetchPosts();
  }

  change({ target }) {
    const { id, value } = target;
    this.setState({ [id]: value });
  }

  editForm(form) {
    this.setState({
      id: form.id,
      value: form.value,
      description: form.description,
      currency: form.currency,
      method: form.method,
      tag: form.tag,
      exchangeRates: form.exchangeRates,
    });
    btnName = true;
  }

  handleClick() {
    const { expenses, dispatchFetchPosts } = this.props;
    dispatchFetchPosts(this.state);
    this.setState({
      id: expenses.length + 1,
      value: '',
      description: '',
      currency: 'USD',
      method: 'Dinheiro',
      tag: Alimentacao,
      exchangeRates: {},
    });
    btnName = false;
  }

  submitChange() {
    const { expenses, dispatchChangeExpense } = this.props;
    dispatchChangeExpense(this.state);
    this.setState({
      id: expenses.length + 1,
      value: '',
      description: '',
      currency: 'USD',
      method: 'Dinheiro',
      tag: Alimentacao,
      exchangeRates: {},
    });
    btnName = false;
  }

  selects() {
    const { currencies } = this.props;
    const { currency, method, tag } = this.state;
    return (
      <div>
        <label htmlFor="currency">
          Moeda
          <select
            value={ currency }
            data-testid="currency-input"
            id="currency"
            onChange={ this.change }
          >
            {currencies.map((coin, index) => (
              <option key={ index } value={ coin }>{ coin }</option>
            ))}
          </select>
        </label>
        <label htmlFor="method">
          Método de pagamento
          <select
            value={ method }
            data-testid="method-input"
            id="method"
            onChange={ this.change }
          >
            <option value="Dinheiro">Dinheiro</option>
            <option value="Cartão de crédito">Cartão de crédito</option>
            <option value="Cartão de débito">Cartão de débito</option>
          </select>
        </label>
        <label htmlFor="tag">
          Tag
          <select value={ tag } data-testid="tag-input" id="tag" onChange={ this.change }>
            <option value={ Alimentacao }>Alimentação</option>
            <option value="Lazer">Lazer</option>
            <option value="Trabalho">Trabalho</option>
            <option value="Transporte">Transporte</option>
            <option value="Saude">Saúde</option>
          </select>
        </label>
      </div>
    );
  }

  form() {
    const { value, description } = this.state;
    return (
      <form>
        <label htmlFor="value">
          Valor
          <input
            type="text"
            value={ value }
            id="value"
            onChange={ this.change }
            data-testid="value-input"
          />
        </label>
        <label htmlFor="description">
          Descrição
          <input
            type="text"
            value={ description }
            id="description"
            data-testid="description-input"
            onChange={ this.change }
          />
        </label>
        { this.selects() }
      </form>
    );
  }

  render() {
    const { email, expenses } = this.props;
    const total = expenses.reduce((acc, { exchangeRates, currency, value }) => (
      acc + (Number(exchangeRates[currency].ask) * Number(value))
    ), 0);
    return (
      <div>
        <header>
          <p>
            <span>Usuário: </span>
            <span data-testid="email-field">{`E-mail: ${email} `}</span>
          </p>
          <p>
            <span>Despesa Total: </span>
            <span data-testid="total-field">{total || '0'}</span>
            <span data-testid="header-currency-field"> BRL</span>
          </p>
        </header>
        { this.form() }
        { btnName
          ? <button type="button" onClick={ this.submitChange }>Editar despesa</button>
          : <button type="button" onClick={ this.handleClick }>Adicionar despesa</button>}
        <Table editForm={ this.editForm } />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  email: state.user.email,
  loading: state.wallet.loading,
  expenses: state.wallet.expenses,
  currencies: state.wallet.currencies,
});

const mapDispatchToProps = (dispatch) => ({
  dispatchFetchPosts: (state) => dispatch(fetchPosts(state)),
  dispatchChangeExpense: (state) => dispatch(changeExpense(state)),
});

Wallet.propTypes = {
  email: PropTypes.string,
  expenses: PropTypes.array,
  loading: PropTypes.bool,
  dispatchFetchPosts: PropTypes.func,
}.isRequired;

export default connect(mapStateToProps, mapDispatchToProps)(Wallet);
