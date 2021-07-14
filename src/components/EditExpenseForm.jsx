import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import TagSelector from './TagSelector';
import MethodSelector from './MethodSelector';
import { editExpenseSuccess } from '../actions';

class EditExpenseForm extends Component {
  constructor(props) {
    super(props);
    const {
      currencies,
      expense: {
        value,
        description,
        currency,
        method,
        tag,
        id,
      } } = props;
    this.state = {
      currencies: [...currencies],
      value,
      description,
      currency,
      method,
      tag,
      id,
    };
    this.handleChange = this.handleChange.bind(this);
    this.sendInformation = this.sendInformation.bind(this);
  }

  sendInformation() {
    const { value, description, currency, method, tag, id } = this.state;
    const { expense: { exchangeRates }, editSuccess } = this.props;
    const obj = {
      value,
      description,
      currency,
      method,
      tag,
      id,
      exchangeRates,
    };
    editSuccess(obj);
  }

  handleChange({ target: { name, value } }) {
    this.setState({
      [name]: value,
    });
  }

  render() {
    const { currencies, value, description, currency, method, tag } = this.state;
    return (
      <form>
        <label htmlFor="value">
          Valor
          <input
            type="number"
            data-testid="value-input"
            onChange={ this.handleChange }
            value={ value }
            id="value"
            name="value"
          />
        </label>
        <label htmlFor="description">
          Descrição
          <textarea
            name="description"
            data-testid="description-input"
            onChange={ this.handleChange }
            value={ description }
            id="description"
          />
        </label>
        <label htmlFor="currency-selector">
          Moeda
          <select
            name="currency"
            value={ currency }
            data-testid="currency-input"
            onChange={ this.handleChange }
            id="currency-selector"
          >
            {currencies.map(({ code }) => (
              <option key={ code } value={ code }>{ code }</option>
            ))}
          </select>
        </label>
        <MethodSelector value={ method } change={ this.handleChange } />
        <TagSelector value={ tag } change={ this.handleChange } />
        <button onClick={ this.sendInformation } type="button">Editar despesa</button>
      </form>
    );
  }
}

const mapStateToProps = ({ wallet }) => ({
  expenses: wallet.expenses,
  expense: wallet.expenseToEdit,
});

const mapDispatchToProps = (dispatch) => ({
  editSuccess: (payload) => dispatch(editExpenseSuccess(payload)),
});

EditExpenseForm.propTypes = ({
  expense: PropTypes.arrayOf(PropTypes.object).isRequired,
  currencies: PropTypes.arrayOf(PropTypes.object).isRequired,
  editSuccess: PropTypes.func.isRequired,
});

export default connect(mapStateToProps, mapDispatchToProps)(EditExpenseForm);
