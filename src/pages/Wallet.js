import React from 'react';
import '../styles/Wallet.css';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { fetchApiCurrencies, getExpense } from '../actions';

class Wallet extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // id: 0,
      value: '',
      description: '',
      currency: 'USD',
      method: 'Dinheiro',
      tag: 'Alimentação',
    };

    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    const { fetchAPI } = this.props;
    fetchAPI();
  }

  handleChange({ target }) {
    const { name, value } = target;
    this.setState({
      [name]: value,
    });
  }

  buttonFunction() {
    // const { id } = this.state; // currencies, storeExpenses, addNewExpense
    // const { value, description, currency, method, tag } = this.state;
    // const expenses = [{
    //   id: storeExpenses.length,
    //   value,
    //   description,
    //   currency,
    //   method,
    //   tag,
    //   exchangeRates: {},
    // }];
    // this.setState({ id: id + 1 });
    // addNewExpense();
  }

  renderValueInput() {
    const { value } = this.state;
    return (
      <label htmlFor="expenses-input">
        Valor:
        <input
          type="number"
          id="expenses-input"
          name="value"
          value={ value }
          onChange={ this.handleChange }
        />
      </label>
    );
  }

  renderDescriptionInput() {
    const { description } = this.state;
    return (
      <label htmlFor="expenses-description">
        Descrição:
        <textarea
          type="text"
          id="expenses-description"
          name="description"
          value={ description }
          onChange={ this.handleChange }
        />
      </label>
    );
  }

  renderCoinCurrencies() {
    const { currencies } = this.props;
    return (
      <label htmlFor="moeda">
        Moeda
        <select
          id="moeda"
          name="currency"
          onChange={ this.handleChange }
        >
          {currencies.map((currency, index) => (
            <option value={ currency } key={ index }>{currency}</option>
          ))}
        </select>
      </label>
    );
  }

  renderPaymentMethods() {
    const { method } = this.state;
    return (
      <label htmlFor="payment-method-input">
        Método de pagamento:
        <select
          id="payment-method-input"
          name="method"
          value={ method }
          onChange={ this.handleChange }
        >
          <option value="Dinheiro">Dinheiro</option>
          <option value="Cartão de crédito">Cartão de crédito</option>
          <option value="Cartão de débito">Cartão de débito</option>
        </select>
      </label>
    );
  }

  renderTagInput() {
    const { tag } = this.state;
    return (
      <label htmlFor="tags-input">
        tag:
        <select
          id="tags-input"
          name="tag"
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

  render() {
    const { email } = this.props;
    return (
      <div className="page">
        <header className="header">
          <p data-testid="email-field">{ email }</p>
          <p data-testid="total-field">{ `Despesa Total: $ ${0} ` }</p>
          <p data-testid="header-currency-field">BRL</p>
        </header>

        <form className="form">
          {this.renderValueInput()}

          {this.renderDescriptionInput()}

          {this.renderCoinCurrencies()}

          {this.renderPaymentMethods()}

          {this.renderTagInput()}

          <button
            type="button"
            onClick={ this.buttonFunction() }
          >
            Adicionar despesa
          </button>

        </form>
      </div>
    );
  }
}

// Função responsável por mapear a store, e colocar um state dentro da prop email.
// Neste caso quero o state do email de meu reducer user.
const mapStateToProps = (state) => ({
  email: state.user.email,
  currencies: state.wallet.currencies,
  storeExpenses: state.wallet.expenses,
});

// Função responsável por pegar a action e colocar dentro de uma prop para o componente.
// Para que dessa prop o dispatch possa ser acionado.
const mapDispatchToProps = (dispatch) => ({
  fetchAPI: () => dispatch(fetchApiCurrencies()),
  addNewExpense: () => dispatch(getExpense()),
});

Wallet.propTypes = ({
  email: PropTypes.string,
  currencies: PropTypes.shape({ Object }),
  fetchAPI: PropTypes.func,
}).isRequired;

export default connect(mapStateToProps, mapDispatchToProps)(Wallet);

// TODO Dentro do botao colocar um dispatch para armazenar.
