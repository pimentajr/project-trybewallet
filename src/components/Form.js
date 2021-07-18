import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import CurrencySelect from "./CurrencySelect";

class Form extends React.Component {
  constructor(props) {
    super(props);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onSubmit(event) {
    event.preventDefault();

    const formElement = event.target;
    const formData = new FormData(formElement);

    const values = {
      value: formData.get("valor"),
      description: formData.get("descrição"),
      currency: formData.get("moeda"),
      method: formData.get("método de pagamento"),
      tag: formData.get("tag"),
    };

    if (values.value && values.description) {
      this.props.createExpense(values);
      formElement.reset();
    }
  }

  render() {
    return (
      <form onSubmit={this.onSubmit}>
        <label htmlFor="value">
          Valor
          <input id="value" name="valor" type="number" />
        </label>
        <label htmlFor="description">
          Descrição
          <input id="description" name="descrição" />
        </label>
        <CurrencySelect />
        <label htmlFor="method">
          Método de pagamento
          <select id="method" name="método de pagamento">
            <option>Dinheiro</option>
            <option>Cartão de crédito</option>
            <option>Cartão de débito</option>
          </select>
        </label>
        <label htmlFor="tag">
          Tag
          <select id="tag" name="tag">
            <option>Alimentação</option>
            <option>Lazer</option>
            <option>Trabalho</option>
            <option>Transporte</option>
            <option>Saúde</option>
          </select>
        </label>
        <button type="submit">adicionar despesa</button>
      </form>
    );
  }
}

Form.propTypes = {};

function createExpenseThunk(values) {
  return (dispatch) => {
    return fetch("https://economia.awesomeapi.com.br/json/all")
      .then((res) => res.json())
      .then((exchangeRates) => {
        dispatch({
          type: "WALLET_CREATE_EXPENSE",
          payload: { ...values, exchangeRates },
        });
      });
  };
}

function mapDispatchToProps(dispatch) {
  return {
    createExpense: (values) => {
      dispatch(createExpenseThunk(values));
    },
  };
}

export default connect(null, mapDispatchToProps)(Form);
