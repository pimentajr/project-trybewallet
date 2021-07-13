import React, { Component } from 'react';

class PaymentDescription extends Component {
  constructor(props) {
    super(props);
    this.state = {
      description: '',
    };
    this.handleTest = this.handleTest.bind(this);
  }

  handleTest(e) {
    this.setState({
      description: e.target.value,
    });
  }

  render() {
    const { description } = this.state;
    return (
      <div>
        <label htmlFor="description">
          Descrição:
          <input
            type="text"
            name="description"
            id="description"
            value={ description }
            onChange={ this.handleTest }
          />
        </label>
      </div>
    );
  }
}

export default PaymentDescription;
