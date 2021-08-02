import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getCurrencies as getCurrenciesThunk } from '../actions';

class Form extends Component {
  constructor() {
    super();

    this.handleChange = this.handleChange.bind(this);
    this.renderCurrencies = this.renderCurrencies.bind(this);
    this.renderTags = this.renderTags.bind(this);
    this.renderPaymentMethods = this.renderPaymentMethods.bind(this);

    this.state = {
    //   value: '',
    //   description: '',
      currency: 'USD',
    //   method: 'Dinheiro',
    //   tag: 'Alimentação',
    };
  }

  componentDidMount() {
    const { getCurrencies } = this.props;
    getCurrencies();
  }

  handleChange({ target: { name, value } }) {
    this.setState({
      [name]: value,
    });
  }

  renderCurrencies() {
    const { currencies } = this.props;
    const { currency } = this.state;

    return (
      <select
        name="currency"
        value={ currency }
        id="currency"
        data-testid="currency-input"
        onChange={ (e) => this.handleChange(e) }
      >
        {currencies.map((currencyItem, index) => (
          <option
            key={ index }
            value={ currencyItem }
          >
            {currencyItem}
          </option>
        ))}
      </select>
    );
  }

  renderTags() {
    return (
      <select
        name="tag"
        id="tag"
        data-testid="tag-input"
      >
        <option value="Alimentação">Alimentação</option>
        <option value="Lazer">Lazer</option>
        <option value="Trabalho">Trabalho</option>
        <option value="Transporte">Transporte</option>
        <option value="Saúde">Saúde</option>
      </select>
    );
  }

  renderPaymentMethods() {
    return (
      <select
        name="method"
        id="method"
        data-testid="method-input"
      >
        <option value="Dinheiro">Dinheiro</option>
        <option value="Cartão de crédito">Cartão de crédito</option>
        <option value="Cartão de débito">Cartão de débito</option>
      </select>
    );
  }

  render() {
    return (
      <div>
        <form>
          <label htmlFor="value">
            Valor:
            <input
              type="text"
              name="value"
              id="value"
              data-testid="value-input"
            />
          </label>
          <label htmlFor="description">
            Descrição:
            <input
              type="text"
              name="description"
              id="description"
              data-testid="description-input"
            />
          </label>
          <label htmlFor="currency">
            Moeda:
            { this.renderCurrencies() }
          </label>
          <label htmlFor="method">
            Método de pagamento:
            { this.renderPaymentMethods() }
          </label>
          <label htmlFor="tag">
            Tag:
            { this.renderTags() }
          </label>
        </form>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  getCurrencies: () => dispatch(getCurrenciesThunk()),
});

const mapStateToProps = (state) => ({
  currencies: state.wallet.currencies,
});

Form.propTypes = {
  getCurrencies: PropTypes.func.isRequired,
  currencies: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Form);
