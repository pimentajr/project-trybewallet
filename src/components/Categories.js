import React, { Component } from 'react';

export default class Categories extends Component {
  render() {
    return (
      <>
        <option selected value="Alimentação">Alimentação</option>
        <option value="Lazer">Lazer</option>
        <option value="Trabalho">Trabalho</option>
        <option value="Transporte">Transporte</option>
        <option value="Saúde">Saúde</option>
      </>
    );
  }
}
