import React, { Component } from 'react';

class ButtonAddExpense extends Component {
  render() {
    const { sendFunc, dataExpense } = this.props;
    return (
      <div>
        <button type="button" onClick={ () => sendFunc(dataExpense) }>
          Adicionar despesa
        </button>
      </div>
    );
  }
}

export default ButtonAddExpense;
