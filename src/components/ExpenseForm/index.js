import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import LabelledInput from '../LabelledInput';
import LabelledSelect from '../LabelledSelect';
import { fetchCurrencies, fetchCurrenciesList, updateExpense } from '../../actions';
import { cloneObject } from '../../helpers/utils';

const paymentOptions = ['Dinheiro', 'Cartão de crédito', 'Cartão de débito'];

const tagOptions = ['Alimentação', 'Lazer', 'Trabalho', 'Transporte', 'Saúde'];

const initialState = {
  value: 0,
  description: '',
  currency: '',
  method: paymentOptions[0],
  tag: tagOptions[0],
  isEditing: false,
};

class ExpenseForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = { ...initialState };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    const { setCurrenciesList } = this.props;

    setCurrenciesList();
  }

  componentDidUpdate() {
    const { editingExpense } = this.props;
    const { currency, isEditing } = this.state;

    if (Object.keys(editingExpense).length > 0 && !isEditing) {
      this.setUpdatingValues(editingExpense);
    }

    if (currency === '') this.setInitialCurrency();
  }

  setInitialCurrency() {
    const { currencies } = this.props;

    this.setState({
      currency: currencies[0],
    });
  }

  setUpdatingValues({ value, description, currency, method, tag }) {
    this.setState({
      value,
      description,
      currency,
      method,
      tag,
      isEditing: true,
    });
  }

  getInputs() {
    const { currencies } = this.props;
    const { value, description, currency, method, tag } = this.state;

    return (
      <>
        <LabelledInput
          id="value"
          label="Valor"
          type="number"
          value={ value }
          onChange={ this.handleChange }
          data-testid="value-input"
        />
        <LabelledInput
          id="description"
          label="Descrição"
          value={ description }
          onChange={ this.handleChange }
          data-testid="description-input"
        />
        <LabelledSelect
          id="currency"
          label="Moeda"
          options={ currencies }
          value={ currency }
          onChange={ this.handleChange }
          data-testid="currency-input"
        />
        <LabelledSelect
          id="method"
          label="Método de pagamento"
          options={ paymentOptions }
          value={ method }
          onChange={ this.handleChange }
          data-testid="method-input"
        />
        <LabelledSelect
          id="tag"
          label="Tag"
          options={ tagOptions }
          value={ tag }
          onChange={ this.handleChange }
          data-testid="tag-input"
        />
      </>
    );
  }

  handleChange({ name, value }) {
    this.setState({
      [name]: value,
    });
  }

  resetState() {
    const { currencies } = this.props;

    this.setState({
      ...initialState,
      currency: currencies[0],
    });
  }

  handleSubmit() {
    const stateClone = cloneObject(this.state);
    const { isEditing } = this.state;
    const { newExpense, editingExpense, editExpense, setEditingExpense } = this.props;

    delete stateClone.isEditing;

    if (isEditing) editExpense({ ...editingExpense, ...stateClone });
    else newExpense(stateClone);

    this.resetState();
    setEditingExpense({});
  }

  render() {
    const { isEditing } = this.state;

    return (
      <form>
        { this.getInputs() }
        <button type="button" onClick={ this.handleSubmit }>
          {isEditing ? 'Editar despesa' : 'Adicionar despesa' }
        </button>
      </form>
    );
  }
}

const mapStateToProps = ({ wallet: { currencies } }) => ({
  currencies,
});

const mapDispatchToProps = (dispatch) => ({
  newExpense: (payload) => dispatch(fetchCurrencies(payload)),
  editExpense: (expense) => dispatch(updateExpense(expense)),
  setCurrenciesList: () => dispatch(fetchCurrenciesList()),
});

export default connect(mapStateToProps, mapDispatchToProps)(ExpenseForm);

ExpenseForm.propTypes = {
  newExpense: PropTypes.func,
}.isRequired;
