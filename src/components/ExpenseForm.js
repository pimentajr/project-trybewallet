import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchCurrencies } from '../actions';

class ExpenseForm extends React.Component {
  constructor() {
    super();

    this.state = {
      value: 0,
      description: '',
      currency: 'USD',
      method: 'Dinheiro',
      tag: 'Alimentação',
      exchangeRates: {},
      id: 0,
    };

    this.saveInfo = this.saveInfo.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.renderCurrencies = this.renderCurrencies.bind(this);
    this.renderMethods = this.renderMethods.bind(this);
    this.renderTags = this.renderTags.bind(this);
  }

  componentDidMount() {
    this.currenciesAPI();
  }

  currenciesAPI() {
    fetch('https://economia.awesomeapi.com.br/json/all')
      .then((r) => r.json())
      .then((json) => (
        this.setState({ exchangeRates: json })
      ));
  }

  handleChange({ target }) {
    const { id, value } = target;

    this.setState({
      [id]: value,
    });
  }

  saveInfo() {
    const { addingExpense } = this.props;
    const { value, description, tag, method, currency, id } = this.state;

    const expenses = { id, value, description, tag, method, currency };

    addingExpense(expenses);

    this.setState((previousState) => ({
      value: 0,
      description: '',
      currency: 'USD',
      method: 'Dinheiro',
      tag: 'Alimentação',
      id: previousState.id + 1,
    }));
  }

  renderCurrencies() {
    const { exchangeRates } = this.state;
    const currencies = Object.keys(exchangeRates);

    return currencies.filter((curr) => curr !== 'USDT')
      .map((cr, index) => <option key={ index }>{cr}</option>);
  }

  renderMethods() {
    const { method } = this.state;

    return (
      <select id="method" value={ method } onChange={ this.handleChange }>
        <option>Dinheiro</option>
        <option>Cartão de crédito</option>
        <option>Cartão de débito</option>
      </select>
    );
  }

  renderTags() {
    const { tag } = this.state;
    return (
      <select id="tag" value={ tag } onChange={ this.handleChange }>
        <option>Alimentação</option>
        <option>Lazer</option>
        <option>Trabalho</option>
        <option>Transporte</option>
        <option>Saúde</option>
      </select>
    );
  }

  render() {
    const { value, currency, description } = this.state;

    return (
      <div>
        <form>
          <label htmlFor="value">
            Valor
            <input
              type="number"
              id="value"
              value={ value }
              onChange={ this.handleChange }
            />
          </label>

          <label htmlFor="currency">
            Moeda
            <select id="currency" value={ currency } onChange={ this.handleChange }>
              {this.renderCurrencies()}
            </select>
          </label>

          <label htmlFor="method">
            Método de pagamento
            {this.renderMethods()}
          </label>

          <label htmlFor="tag">
            Tag
            {this.renderTags()}
          </label>

          <label htmlFor="description">
            Descrição
            <input
              type="text"
              id="description"
              value={ description }
              onChange={ this.handleChange }
            />
          </label>

          <button type="button" onClick={ this.saveInfo }>Adicionar despesa</button>
        </form>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  addingExpense: (expenses) => dispatch(fetchCurrencies(expenses)),
});

ExpenseForm.propTypes = {
  addingExpense: PropTypes.func.isRequired,
};

export default connect(null, mapDispatchToProps)(ExpenseForm);
