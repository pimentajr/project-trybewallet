import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addExpenseAction, getCotationThunk } from '../actions';

class Form extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: 0,
      description: '',
      currency: 'USD',
      method: 'Dinheiro',
      tag: 'Alimentação',
    };
    this.formHandler = this.formHandler.bind(this);
    this.addExpenseButtonHandler = this.addExpenseButtonHandler.bind(this);
    this.selectRender = this.selectRender.bind(this);
  }

  componentDidMount() {
    const { getCotation } = this.props;
    getCotation();
  }

  formHandler(e) {
    const { name } = e.target;
    this.setState({ [name]: e.target.value });
  }

  addExpenseButtonHandler() {
    const { getCotation } = this.props;
    getCotation();

    const { addExpense, id } = this.props;
    addExpense(this.state, id);
  }

  selectRender() {
    return (
      <div>
        <label htmlFor="method">
          Método de pagamento
          <select id="method" name="method" onChange={ (e) => this.formHandler(e) }>
            <option>Dinheiro</option>
            <option>Cartão de crédito</option>
            <option>Cartão de débito</option>
          </select>
        </label>
        <label htmlFor="tag">
          Tag
          <select name="tag" id="tag" onChange={ (e) => this.formHandler(e) }>
            <option>Alimentação</option>
            <option>Lazer</option>
            <option>Trabalho</option>
            <option>Transporte</option>
            <option>Saúde</option>
          </select>
        </label>
      </div>
    );
  }

  render() {
    const { currencies } = this.props;
    const currenciesArray = Object.values(currencies);
    const currenciesFiltered = currenciesArray.filter((item) => item.codein !== 'BRLT');
    return (
      <div>
        <form>
          <label htmlFor="value">
            Valor:
            <input
              type="text"
              name="value"
              id="value"
              onChange={ (e) => this.formHandler(e) }
            />
          </label>
          <label htmlFor="description">
            Descrição
            <input
              type="text"
              name="description"
              id="description"
              onChange={ (e) => this.formHandler(e) }
            />
          </label>
          <label htmlFor="currency">
            Moeda:
            <select id="currency" name="currency" onChange={ (e) => this.formHandler(e) }>
              { currenciesFiltered.map((curr, index) => (
                <option key={ index }>
                  { curr.code }
                </option>)) }
            </select>
          </label>
          { this.selectRender() }
          <button
            type="button"
            onClick={ () => this.addExpenseButtonHandler() }
          >
            Adicionar despesa
          </button>
        </form>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  currencies: state.wallet.currencies,
  expenses: state.wallet.expenses,
  id: state.wallet.id,
});

const mapDispatchToProps = (dispatch) => ({
  getCotation: () => dispatch(getCotationThunk()),
  addExpense: (payload, id) => dispatch(addExpenseAction(payload, id)),
});

Form.propTypes = {
  currencies: PropTypes.arrayOf(PropTypes.object).isRequired,
  getCotation: PropTypes.func.isRequired,
  addExpense: PropTypes.func.isRequired,
  id: PropTypes.number.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Form);
