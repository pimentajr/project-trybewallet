import React, { Component } from 'react';
import { connect } from 'react-redux';

class Form extends Component {
  constructor(props) {
    super(props);

    this.state = {
      id: 0,
      value: '',
      description: '',
      currency: '',
      paymentMethod: '',
      tag: '',
    };

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange({ target: { name, value } }) {
    this.setState({
      [name]: value,
    });
  }

  render() {
    // console.log('fetch return:', fetchCurrencyList());
    const { receivedCurrencies } = this.props;
    return (
      <div>
        <form>
          <label htmlFor="value">
            Valor:
            <input name="value" type="text" id="value" onChange={ this.handleChange } />
          </label>
          <label htmlFor="description">
            Descrição:
            <input name="description" type="text" id="description" onChange={ this.handleChange } />
          </label>
          <label htmlFor="currency">
            Moeda
            <select name="currency" id="currency" onChange={ this.handleChange }>
              {receivedCurrencies
                ? receivedCurrencies
                  .filter((coin) => coin !== 'USDT')
                  .map((coinFinal, index) => <option key={ index }>{coinFinal}</option>)
                : '' }
            </select>
          </label>
          <label htmlFor="payment-option">
            Método de pagamento:
            <select name="paymentMethod" id="payment-option" onChange={ this.handleChange }>
              <option>Dinheiro</option>
              <option>Cartão de crédito</option>
              <option>Cartão de débito</option>
            </select>
          </label>
          <label htmlFor="tag">
            Tag:
            <select name="tag" id="tag" onChange={ this.handleChange }>
              <option>Alimentação</option>
              <option>Lazer</option>
              <option>Trabalho</option>
              <option>Transporte</option>
              <option>Saúde</option>
            </select>
          </label>
        </form>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  receivedCurrencies: state.wallet.currencies,
});

export default connect(mapStateToProps)(Form);
