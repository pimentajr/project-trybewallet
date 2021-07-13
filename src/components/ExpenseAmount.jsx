import React, { Component } from 'react';

class ExpenseAmount extends Component {
  constructor(props) {
    super(props);
    this.state = {
      amount: 0,
    };
    this.handleTest = this.handleTest.bind(this);
  }

  handleTest(e) {
    this.setState({
      amount: e.target.value,
    });
  }

  render() {
    const { amount } = this.state;
    return (
      <div>
        <label htmlFor="value">
          Valor:
          <input
            type="number"
            name="value"
            id="value"
            value={ amount }
            onChange={ this.handleTest }
          />
        </label>
      </div>
    );
  }
}

export default ExpenseAmount;
