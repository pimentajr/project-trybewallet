import React from 'react';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';
import { fetchApi, addExpense, editExpense } from '../actions';

class ExpensesForm extends React.Component {
  constructor() {
    super();

    this.state = {
      id: 0,
      value: 0,
      currency: 'USD',
      method: 'Dinheiro',
      tag: 'Alimentação',
      description: '',
    };

    this.handleInput = this.handleInput.bind(this);
    this.addExpense = this.addExpense.bind(this);
    this.renderValue = this.renderValue.bind(this);
    this.renderCurrency = this.renderCurrency.bind(this);
    this.renderMethod = this.renderMethod.bind(this);
    this.renderTag = this.renderTag.bind(this);
    this.renderDescription = this.renderDescription.bind(this);
    this.renderButtons = this.renderButtons.bind(this);
  }

  componentDidMount() {
    const { dispatchFetchApi } = this.props;
    dispatchFetchApi();
  }

  handleInput(event) {
    const { value, name } = event.target;
    this.setState({
      [name]: value,
    });
  }

  addExpense() {
    const { currentRates, dispatchAddExpense, dispatchFetchApi } = this.props;
    dispatchFetchApi();
    dispatchAddExpense({ ...this.state, exchangeRates: currentRates });
    this.setState((previousState) => ({
      id: previousState.id + 1,
      value: 0,
      currency: 'USD',
      method: 'Dinheiro',
      tag: 'Alimentação',
      description: '',
    }));
  }

  renderValue() {
    const { value } = this.state;
    return (
      <label htmlFor="value">
        Valor:
        <input
          type="number"
          name="value"
          data-testid="value-input"
          id="value"
          value={ value }
          onChange={ this.handleInput }
        />
      </label>
    );
  }

  renderCurrency() {
    const { currency } = this.state;
    const { currencies } = this.props;
    return (
      <label htmlFor="currency">
        Moeda:
        <select
          name="currency"
          id="currency"
          data-testid="currency-input"
          value={ currency }
          onChange={ this.handleInput }
        >
          {currencies
            .filter((curr) => curr !== 'USDT')
            .map((curr) => (
              <option key={ curr } value={ curr }>{ curr }</option>
            ))}
        </select>
      </label>
    );
  }

  renderMethod() {
    const { method } = this.state;
    return (
      <label htmlFor="method">
        Método de pagamento:
        <select
          name="method"
          id="method"
          data-testid="method-input"
          value={ method }
          onChange={ this.handleInput }
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
        Tag:
        <select
          name="tag"
          id="tag"
          data-testid="tag-input"
          value={ tag }
          onChange={ this.handleInput }
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

  renderDescription() {
    const { description } = this.state;
    return (
      <label htmlFor="description">
        Descrição
        <input
          type="text"
          name="description"
          id="description"
          data-testid="description-input"
          value={ description }
          onChange={ this.handleInput }
        />
      </label>
    );
  }

  renderButtons() {
    const { enableButton, dispatchEditExpense } = this.props;
    const { state } = this;
    if (!enableButton) {
      return (
        <button type="button" onClick={ this.addExpense }>
          Adicionar Despesa
        </button>
      );
    }
    if (enableButton) {
      return (
        <button type="button" onClick={ () => dispatchEditExpense(state) }>
          Editar Despesa
        </button>
      );
    }
  }

  render() {
    return (
      <form>
        { this.renderValue() }
        { this.renderCurrency() }
        { this.renderMethod() }
        { this.renderTag() }
        { this.renderDescription() }
        { this.renderButtons() }
      </form>
    );
  }
}

const mapStateToProps = (state) => ({
  currencies: state.wallet.currencies,
  currentRates: state.wallet.currentRates,
  enableButton: state.wallet.enableEdit,
  expenseToEdit: state.wallet.expenseToEdit,
});

const mapDispatchToProps = (dispatch) => ({
  dispatchFetchApi: (state) => dispatch(fetchApi(state)),
  dispatchAddExpense: (expense) => dispatch(addExpense(expense)),
  dispatchEditExpense: (state) => dispatch(editExpense(state)),
});

ExpensesForm.propTypes = {
  currencies: PropTypes.arrayOf(PropTypes.string).isRequired,
  dispatchFetchApi: PropTypes.func.isRequired,
  currentRates: PropTypes.objectOf().isRequired,
  dispatchAddExpense: PropTypes.func.isRequired,
  enableButton: PropTypes.bool.isRequired,
  dispatchEditExpense: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(ExpensesForm);
