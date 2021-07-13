import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { fetchCurr, saveExpense } from '../actions';

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
    this.handleChange = this.handleChange.bind(this);
    this.getConvertValue = this.getConvertValue.bind(this);
  }

  componentDidMount() {
    const { getDataCurr } = this.props;
    getDataCurr();
  }

  getConvertValue() {
    const { expenses } = this.props;
    let total = 0;
    expenses.forEach((item) => {
      total += (parseInt(item.value, 10) * item.exchangeRates[item.currency]
        .ask);
    });
    return total.toFixed(2);
  }

  handleChange({ target }) {
    const { name, value } = target;
    this.setState({
      [name]: value,
    });
  }

  renderValor() {
    const { value } = this.state;
    return (
      <label htmlFor="value">
        Valor
        <input
          type="text"
          name="value"
          id="value"
          value={ value }
          onChange={ this.handleChange }
        />
      </label>
    );
  }

  renderDescricao() {
    const { description } = this.state;
    return (
      <label htmlFor="description">
        Descrição
        <input
          type="text"
          name="description"
          id="description"
          value={ description }
          onChange={ this.handleChange }
        />
      </label>
    );
  }

  renderMoeda() {
    const { currency } = this.state;
    const { currencies } = this.props;
    return (
      <label htmlFor="currency">
        Moeda
        <select
          role="combobox"
          type="text"
          name="currency"
          id="currency"
          value={ currency }
          onChange={ this.handleChange }
        >
          {currencies.map((item) => (
            <option key={ item }>
              { item }
            </option>))}
        </select>
      </label>
    );
  }

  renderPagamento() {
    const { method } = this.state;
    return (
      <label htmlFor="method">
        Método de pagamento
        <select
          role="combobox"
          type="text"
          name="method"
          id="method"
          value={ method }
          onChange={ this.handleChange }
        >
          <option>Dinheiro</option>
          <option>Cartão de crédito</option>
          <option>Cartão de débito</option>
        </select>
      </label>
    );
  }

  renderTag() {
    const { tag } = this.state;
    return (
      <label htmlFor="tag">
        Tag
        <select
          role="combobox"
          type="text"
          name="tag"
          id="tag"
          value={ tag }
          onChange={ this.handleChange }
        >
          <option>Alimentação</option>
          <option>Lazer</option>
          <option>Trabalho</option>
          <option>Transporte</option>
          <option>Saúde</option>
        </select>
      </label>
    );
  }

  renderButton() {
    const { saveData } = this.props;
    return (
      <button
        type="button"
        onClick={ () => saveData(this.state) }
      >
        Adicionar despesa
      </button>);
  }

  render() {
    const { email } = this.props;
    return (
      <div>
        <header>
          <h2 data-testid="email-field">{ email }</h2>
          <span data-testid="total-field">{ this.getConvertValue() }</span>
          <p data-testid="header-currency-field">BRL</p>
        </header>
        <form type="submit">
          {this.renderValor()}
          {this.renderDescricao()}
          {this.renderMoeda()}
          {this.renderPagamento()}
          {this.renderTag()}
          {this.renderButton()}
        </form>
      </div>
    );
  }
}
const mapStateToProps = (state) => ({
  email: state.user.email,
  currencies: state.wallet.currencies,
  expenses: state.wallet.expenses,
});

const mapDispatchToProps = (dispatch) => ({
  getDataCurr: () => dispatch(fetchCurr()),
  saveData: (state) => dispatch(saveExpense(state)),
});

Wallet.propTypes = {
  email: PropTypes.string,
}.isRequired;

export default connect(mapStateToProps, mapDispatchToProps)(Wallet);
