import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import * as rootActions from '../actions';
import Table from './Table';

class Form extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: 0,
      currency: 'USD',
      method: 'Dinheiro',
      tag: 'Alimentação',
      description: '',
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  componentDidMount() {
    const { setAPI } = this.props;
    setAPI();
  }

  handleChange(event) {
    const { name } = event.target;
    this.setState({
      [name]: event.target.value,
    });
  }

  handleClick() {
    const { setAPI } = this.props;
    setAPI();
    const { expenses, id } = this.props;
    expenses(this.state, id);
  }

  render() {
    const { currencyAcronym } = this.props;
    return (
      <div className="form">
        <form>
          <label htmlFor="valor">
            Valor:
            <input type="number" id="valor" name="value" onChange={ this.handleChange } />
          </label>
          <label htmlFor="currency">
            Moeda:
            <select id="currency" name="currency" onChange={ this.handleChange }>
              { Object.values(currencyAcronym).filter((item) => item.codein !== 'BRLT')
                .map((e, index) => <option key={ index }>{e.code}</option>)}
            </select>
          </label>
          <label htmlFor="payment">
            Método de pagamento:
            <select id="payment" name="method" onChange={ this.handleChange }>
              <option>Dinheiro</option>
              <option>Cartão de crédito</option>
              <option>Cartão de débito</option>
            </select>
          </label>
          <label htmlFor="tag">
            Tag:
            <select id="tag" name="tag" onChange={ this.handleChange }>
              <option>Alimentação</option>
              <option>Lazer</option>
              <option>Trabalho</option>
              <option>Transporte</option>
              <option>Saúde</option>
            </select>
          </label>
          <label htmlFor="description">
            Descrição:
            <input
              type="text"
              id="description"
              name="description"
              onChange={ this.handleChange }
            />
          </label>
          <button type="button" onClick={ this.handleClick }>Adicionar despesas</button>
        </form>
        <Table />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  currencyAcronym: state.wallet.currencies,
  id: state.wallet.id,
});

const mapDispatchToProps = (dispatch) => ({
  setAPI: () => dispatch(rootActions.fetchCurrencyAPI()),
  expenses: (payload, id) => dispatch(rootActions.addExpenses(payload, id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Form);

Form.propTypes = {
  setAPI: PropTypes.func,
}.isRequired;
