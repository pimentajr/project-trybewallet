import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { fetchApi } from '../actions';

class Form extends Component {
  constructor() {
    super();
    this.state = {
      value: 0,
      description: '',
      currency: 'USD',
      method: 'Dinheiro',
      tag: 'Alimentação',
    };
    this.handleChange = this.handleChange.bind(this);
    // this.handleClick = this.handleClick.bind(this);
    this.handleFetch = this.handleFetch.bind(this);
  }

  componentDidMount() {
    this.handleFetch();
  }

  async handleFetch() {
    const { reqAction } = this.props;
    const { response } = await reqAction();
    const curr = Object.keys(response);
    const arrayCurr = curr.filter((coin) => coin !== 'USDT');
    this.setState({
      currencies: arrayCurr,
    });
    return arrayCurr;
  }

  handleChange({ target }) {
    const { name, value } = target;
    this.setState({
      [name]: value,
    });
  }

  // handleClick() {
  //   console.log('oi');
  // }

  renderSelects() {
    const { currency, method, tag, currencies } = this.state;
    return (
      <>
        <label htmlFor="currency">
          Moeda
          <select
            name="currency"
            id="currency"
            value={ currency }
            onChange={ this.handleChange }
          >
            { currencies && currencies
              .map((curr, index) => (
                <option value={ curr } key={ index }>{ curr }</option>))}
          </select>
        </label>
        <label htmlFor="method">
          Método de pagamento
          <select
            name="method"
            id="method"
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
            name="tag"
            id="tag"
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
      </>
    );
  }

  render() {
    const { value, description } = this.state;
    return (
      <form>
        <label htmlFor="value">
          Valor
          <input
            type="text"
            name="value"
            id="value"
            value={ value }
            onChange={ this.handleChange }
          />
        </label>
        <label htmlFor="description">
          Descrição
          <input
            type="text"
            name="description"
            id="description"
            value={ description }
            onChange={ this.handleChange }
          />
        </label>
        {this.renderSelects()}
        <button type="button" onClick={ this.handleClick }>Adicionar despesa</button>
      </form>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  reqAction: () => dispatch(fetchApi()),
});

const mapStateToProps = (state) => ({
  currencies: state,
});

Form.propTypes = ({
  reqAction: PropTypes.func,
}).isRequired;

export default connect(mapStateToProps, mapDispatchToProps)(Form);
