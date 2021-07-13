import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import InputText from './InputText';
import SelectField from './SelectField';
import { addExpense, getCurrenciesThunk } from '../actions';

const optionPayment = ['Dinheiro', 'Cartão de crédito', 'Cartão de débito'];
const optionTag = ['Alimentação', 'Lazer', 'Saúde', 'Trabalho', 'Transporte'];

class Form extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: 0,
      expenses: [],
      value: '',
      currency: 'USD',
      description: '',
      payment: optionPayment[0],
      tag: optionTag[0],
    };
    this.handleChange = this.handleChange.bind(this);
    this.renderInput = this.renderInput.bind(this);
    this.renderSelect = this.renderSelect.bind(this);
    this.renderForm = this.renderForm.bind(this);
    this.addExpenses = this.addExpenses.bind(this);
    this.updateState = this.updateState.bind(this);
  }

  handleChange({ target: { value, name } }) {
    this.setState({
      [name]: value,
    });
  }

  updateState() {
    const { id } = this.state;
    this.setState({
      id: id + 1,
      value: '',
      currency: 'USD',
      description: '',
      payment: optionPayment[0],
      tag: optionTag[0],
    });
  }

  addExpenses() {
    const { addExpenseRequest, getCurrenciesRequest, currencies } = this.props;
    getCurrenciesRequest();

    const { id, value, currency, description, payment, tag } = this.state;
    this.setState({
      expenses: [{
        id, value, currency, description, payment, tag, currencies,
      }],
    }, () => {
      const { expenses } = this.state;
      addExpenseRequest(expenses);
      this.updateState();
    });
  }

  renderInput(value, name, nameState, type) {
    return (
      <InputText
        value={ value }
        name={ name }
        type={ type }
        nameState={ nameState }
        handleChange={ this.handleChange }
      />
    );
  }

  renderSelect(value, name, nameState, options) {
    return (
      <SelectField
        value={ value }
        name={ name }
        nameState={ nameState }
        handleChange={ this.handleChange }
        options={ options }
      />
    );
  }

  renderForm() {
    const { value, description, payment, tag, currency } = this.state;
    const { currencies } = this.props;
    const currenciesKeys = Object.keys(currencies);
    const currenciesFiltered = currenciesKeys.filter((coin) => coin !== 'USDT');
    return (
      <form className="form-wallet">
        {this.renderInput(value, 'Valor', 'value', 'number')}
        {this.renderInput(description, 'Descriação', 'description', 'text')}
        {this.renderSelect(currency, 'Moeda', 'currency', currenciesFiltered)}
        {this.renderSelect(payment, 'Método de pagamento', 'payment', optionPayment)}
        {this.renderSelect(tag, 'Tag', 'tag', optionTag)}
        <button
          className="form-wallet-button-add-expense"
          type="button"
          onClick={ this.addExpenses }
        >
          Adicionar Despesa
        </button>
      </form>
    );
  }

  render() {
    return (
      this.renderForm()
    );
  }
}

const mapStateToProps = (state) => ({
  currencies: state.wallet.currencies,
});

const mapDispatchToProps = (dispatch) => ({
  addExpenseRequest: (payload) => dispatch(addExpense(payload)),
  getCurrenciesRequest: () => dispatch(getCurrenciesThunk()),
});

Form.propTypes = {
  addExpenseRequest: PropTypes.func.isRequired,
  currencies: PropTypes.objectOf(PropTypes.any).isRequired,
  getCurrenciesRequest: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Form);
