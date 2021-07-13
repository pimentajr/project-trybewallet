import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { addExpense, updateExpense } from '../actions';
import fetchCurrencies from '../services';

class SpendForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      expense: {
        value: 0,
        description: '',
        tag: '',
        currency: '',
        method: '',
      },
      acronymsCurrency: [],
      expenses: [],
      enableToEdit: true,
    };

    this.handleChange = this.handleChange.bind(this);
    this.inputsTexts = this.inputsTexts.bind(this);
    this.selectInputs = this.selectInputs.bind(this);

    this.setAcronymsCurrency = this.setAcronymsCurrency.bind(this);
    this.addExp = this.addExp.bind(this);
    this.setExpenses = this.setExpenses.bind(this);
    this.setEditExp = this.setEditExp.bind(this);
    this.clearFormsAndReloadExpenses = this.clearFormsAndReloadExpenses.bind(this);
  }

  componentDidMount() {
    this.setExpenses();
    this.setAcronymsCurrency();
  }

  componentDidUpdate() {
    this.setEditExp();
  }

  setEditExp() {
    const { editExp: expense } = this.props;
    const { enableToEdit } = this.state;
    if (expense && Object.keys(expense).length !== 0 && enableToEdit) {
      this.setState({ expense, enableToEdit: false });
    }
  }

  async setAcronymsCurrency() {
    const { fetchCurrencie } = this.props;
    await fetchCurrencie();
    const { currencies } = this.props;
    const acronyms = Object.keys(currencies[currencies.length - 1]);
    const acronymsCurrency = acronyms.filter((acron) => acron !== 'USDT');
    this.setState({
      acronymsCurrency,
    });
  }

  setExpenses() {
    const { expenses } = this.props;
    this.setState({
      expenses,
    });
  }

  async addExp(expense) {
    const { addNewExpense, fetchCurrencie } = this.props;
    const { expenses } = this.state;
    await fetchCurrencie();
    const { currencies } = this.props;
    const newExpense = {
      id: (expenses.length),
      ...expense,
      exchangeRates: currencies[currencies.length - 1],
    };
    addNewExpense(newExpense);
    this.clearFormsAndReloadExpenses();
  }

  updateExp(newExpense) {
    const { updateNewExpense } = this.props;
    updateNewExpense(newExpense);
    this.clearFormsAndReloadExpenses();
  }

  clearFormsAndReloadExpenses() {
    this.setExpenses();
    this.setState({ expense: {
      value: 0,
      description: '',
      tag: '',
      currency: '',
      method: '',
    },
    enableToEdit: true });
  }

  handleChange({ target: { id, value } }) {
    this.setState((oldExp) => ({
      expense: { ...oldExp.expense, [id]: value },
    }));
  }

  inputsTexts() {
    const { expense: { value, description } } = this.state;
    return (
      <fieldset>
        <label htmlFor="value">
          Valor
          <input
            id="value"
            type="number"
            data-testid="value-input"
            value={ value }
            onChange={ this.handleChange }
          />
        </label>
        <label htmlFor="description">
          Descrição
          <input
            id="description"
            type="text"
            data-testid="description-input"
            value={ description }
            onChange={ this.handleChange }
          />
        </label>
      </fieldset>
    );
  }

  selectInputs() {
    const { expense, acronymsCurrency } = this.state;
    const { method, tag, currency } = expense;
    return (
      <fieldset>
        <label htmlFor="currency">
          Moeda
          <select
            id="currency"
            data-testid="currency-input"
            onChange={ this.handleChange }
            value={ currency }
          >
            {acronymsCurrency.map((option, index) => (
              <option value={ option } key={ `${option}${index}` }>{ option }</option>
            ))}
          </select>
        </label>
        <label htmlFor="method">
          Método de pagamento
          <select
            id="method"
            data-testid="method-input"
            value={ method }
            onChange={ this.handleChange }
          >
            <option value="Dinheiro">Dinheiro</option>
            <option value="Cartão de crédito">Cartão de crédito</option>
            <option value="Cartão de débito">Cartão de débito</option>
          </select>
        </label>
        <label htmlFor="tag">
          Tag
          <select
            id="tag"
            data-testid="tag-input"
            value={ tag }
            onChange={ this.handleChange }
          >
            <option value="Alimentação">Alimentação</option>
            <option value="Lazer">Lazer</option>
            <option value="Trabalho">Trabalho</option>
            <option value="Transporte">Transporte</option>
            <option value="Saúde">Saúde</option>
          </select>
        </label>
      </fieldset>
    );
  }

  render() {
    const { enableToEdit, expense } = this.state;
    return (
      <form>
        {this.inputsTexts()}
        {this.selectInputs()}
        {enableToEdit ? (
          <button type="button" onClick={ () => this.addExp(expense) }>
            Adicionar despesa
          </button>
        ) : (
          <button type="button" onClick={ () => this.updateExp(expense) }>
            Editar despesa
          </button>
        )}
      </form>
    );
  }
}

const mapStateToProps = (state) => ({
  expenses: state.wallet.expenses,
  currencies: state.wallet.currencies,
  editExp: state.wallet.editExp,
});

const mapDispatchToProps = (dispatch) => ({
  addNewExpense: (expense) => dispatch(addExpense(expense)),
  updateNewExpense: (expense) => dispatch(updateExpense(expense)),
  fetchCurrencie: () => dispatch(fetchCurrencies()),
});

export default connect(mapStateToProps, mapDispatchToProps)(SpendForm);

SpendForm.propTypes = {
  addNewExpense: PropTypes.func.isRequired,
  updateNewExpense: PropTypes.func.isRequired,
  expenses: PropTypes.arrayOf(PropTypes.object).isRequired,
  currencies: PropTypes.arrayOf(PropTypes.object).isRequired,
  fetchCurrencie: PropTypes.func.isRequired,
  editExp: PropTypes.objectOf.isRequired,
};
