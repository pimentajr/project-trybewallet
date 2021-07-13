import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { fetchCurrencies, changeExpense } from '../actions';

class Customize extends React.Component {
  constructor() {
    super();

    this.handleClick = this.handleClick.bind(this);
  }

  componentDidMount() {
    const { getCurrencies, objToChange } = this.props;
    getCurrencies();
    document.getElementById('description').value = objToChange.description;
    document.getElementById('currency').value = objToChange.currency;
    document.getElementById('method').value = objToChange.method;
    document.getElementById('tag').value = objToChange.tag;
    document.getElementById('totalValue').value = parseFloat(objToChange.value);
  }

  handleClick() {
    const { objToChange, executeChange } = this.props;
    const formElement = document.forms['Customize-form'];
    const changedExpense = {
      id: objToChange.id,
      value: formElement.elements.totalValue.value,
      description: formElement.elements.description.value,
      currency: formElement.elements.currency.value,
      method: formElement.elements.method.value,
      tag: formElement.elements.tag.value,
      exchangeRates: objToChange.exchangeRates,
    };
    executeChange(false, changedExpense);
  }

  render() {
    const { currencies } = this.props;
    return (
      <div>
        <form id="Customize-form">
          <label htmlFor="totalValue">
            Valor
            <input type="number" id="totalValue" data-testid="value-input" />
          </label>
          <label htmlFor="description">
            Descrição
            <input type="text" id="description" data-testid="description-input" />
          </label>
          <label htmlFor="currency">
            Moeda
            <select id="currency" data-testid="currency-input">
              {Object.keys(currencies).map((curr, index) => (curr !== 'USDT' ? (
                <option key={ index } id={ curr }>
                  {curr}
                </option>
              ) : null))}
            </select>
          </label>
          <label htmlFor="method">
            Método de pagamento
            <select id="method" data-testid="method-input">
              <option value="Dinheiro">Dinheiro</option>
              <option value="Cartão de crédito">Cartão de crédito</option>
              <option value="Cartão de débito">Cartão de débito</option>
            </select>
          </label>
          <label htmlFor="tag">
            Tag
            <select id="tag" data-testid="tag-input">
              <option value="Alimentação">Alimentação</option>
              <option value="Lazer">Lazer</option>
              <option value="Saúde">Saúde</option>
              <option value="Trabalho">Trabalho</option>
              <option value="Transporte">Transporte</option>
            </select>
          </label>
          <button type="button" onClick={ () => this.handleClick() }>
            Editar despesa
          </button>
        </form>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    currencies: state.wallet.currencies,
    objToChange: state.wallet.objToChange,
  };
}

const mapDispatchToProps = (dispatch) => ({
  getCurrencies: () => dispatch(fetchCurrencies()),
  executeChange: (bool, changedObj) => dispatch(changeExpense(bool, changedObj)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Customize);

Customize.propTypes = {
  objToChange: PropTypes.objectOf(PropTypes.any).isRequired,
  getCurrencies: PropTypes.func.isRequired,
  executeChange: PropTypes.func.isRequired,
  currencies: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.any),
    PropTypes.objectOf(PropTypes.any),
  ]),
};

Customize.defaultProps = {
  currencies: [],
};
