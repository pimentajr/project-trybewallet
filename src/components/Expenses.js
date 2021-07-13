import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchCurrentType, newExpense } from '../actions';
import CurrentType from './CurrentType';

class Expenses extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: 0,
      value: 0,
      description: '',
      currency: 'USD',
      method: 'Dinheiro',
      tag: 'Alimentação',
    };

    this.handleChange = this.handleChange.bind(this);
    this.clickSubmit = this.clickSubmit.bind(this);
  }

  componentDidMount() {
    const { fetchCurrent } = this.props;
    fetchCurrent();
  }

  clickSubmit() {
    const { id } = this.state;
    const { newExpenses } = this.props;
    this.setState({ id: id + 1 });
    newExpenses(this.state);
  }

  handleChange({ target }) {
    const { name, value } = target;
    this.setState({
      [name]: value,
    });
  }

  render() {
    return (
      <form>
        <label htmlFor="value">
          Valor:
          <input type="text" name="value" id="value" onChange={ this.handleChange } />
        </label>
        <label htmlFor="description">
          Descrição:
          <input
            type="text"
            name="description"
            id="description"
            onChange={ this.handleChange }
          />
        </label>
        <label htmlFor="currency">
          Moeda:
          <select id="currency" name="currency" onChange={ this.handleChange }>
            <CurrentType />
          </select>
        </label>
        <label htmlFor="method">
          método de pagamento
          <select id="method" name="method" onChange={ this.handleChange }>
            <option>Dinheiro</option>
            <option>Cartão de crédito</option>
            <option>Cartão de débito</option>
          </select>
        </label>
        <label htmlFor="tag" name="tag" onChange={ this.handleChange }>
          Tag
          <select id="tag" name="tag" onChange={ this.handleChange }>
            <option value="Alimentação">Alimentação</option>
            <option value="Lazer">Lazer</option>
            <option value="Trabalho">Trabalho</option>
            <option value="Transporte">Transporte</option>
            <option value="Saúde">Saúde</option>
          </select>
        </label>
        <button
          type="button"
          onClick={ this.clickSubmit }
        >
          Adicionar despesa
        </button>
      </form>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  fetchCurrent: () => dispatch(fetchCurrentType()),
  newExpenses: (expense) => dispatch(newExpense(expense)),
});

Expenses.propTypes = {
  fetchCurrent: PropTypes.func.isRequired,
  newExpenses: PropTypes.func.isRequired,
};

export default connect(null, mapDispatchToProps)(Expenses);
