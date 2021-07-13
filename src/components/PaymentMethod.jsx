import React, { Component } from 'react';

class PaymentMethod extends Component {
  constructor(props) {
    super(props);
    this.state = {
      method: '',
    };
    this.handleTest = this.handleTest.bind(this);
  }

  handleTest(e) {
    this.setState({
      method: e.target.value,
    });
  }

  render() {
    const { method } = this.state;
    return (
      <div>
        <label htmlFor="PaymentMethod">
          Método de pagamento:
          <select
            id="PaymentMethod"
            value={ method }
            onClick={ this.handleTest }
          >
            <option value="Dinheiro">Dinheiro</option>
            <option value="crédito">Cartão de crédito</option>
            <option value="débito">Cartão de débito</option>
          </select>
        </label>
      </div>
    );
  }
}

export default PaymentMethod;
