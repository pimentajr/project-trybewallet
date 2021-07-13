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
      value: '0',
      description: '',
      currency: 'USD',
      method: optionPayment[0],
      tag: optionTag[0],
    };
    this.handleChange = this.handleChange.bind(this);
    this.renderInput = this.renderInput.bind(this);
    this.renderSelect = this.renderSelect.bind(this);
    this.renderForm = this.renderForm.bind(this);
    this.addExpense = this.addExpense.bind(this);
  }

  addExpense() {
    const { addExpenseAction, getCurrenciesRequest } = this.props;
    const { id } = this.state;
    getCurrenciesRequest();
    addExpenseAction(this.state);
    this.setState({
      id: id + 1,
      value: '0',
      description: '',
      currency: 'USD',
      method: 'Dinheiro',
      tag: 'Alimentação',
    });
  }

  handleChange({ target: { value, name } }) {
    this.setState({
      [name]: value,
    });
  }

  renderInput(value, name, nameState, type) {
    return (
      <InputText
        value={ value }
        name={ name }
        nameState={ nameState }
        type={ type }
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
    const { value, description, method, tag, currency } = this.state;
    const { currencies } = this.props;
    const currenciesKeys = Object.keys(currencies);
    const currenciesFiltered = currenciesKeys.filter((coin) => coin !== 'USDT');
    return (
      <form className="form-wallet">
        {this.renderInput(value, 'Valor', 'value', 'number')}
        {this.renderInput(description, 'Descrição', 'description', 'text')}
        {this.renderSelect(currency, 'Moeda', 'currency', currenciesFiltered)}
        {this.renderSelect(method, 'Método de Pagamento', 'method', optionPayment)}
        {this.renderSelect(tag, 'Tag', 'tag', optionTag)}
        <button
          className="form-wallet-button-add-expense"
          type="button"
          onClick={ this.addExpense }
        >
          Adicionar despesa
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
  getCurrenciesRequest: () => dispatch(getCurrenciesThunk()),
  addExpenseAction: (payload) => dispatch(addExpense(payload)),
});

Form.propTypes = {
  getCurrenciesRequest: PropTypes.func.isRequired,
  addExpenseAction: PropTypes.func.isRequired,
  currencies: PropTypes.shape({
    code: PropTypes.string,
  }).isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Form);
