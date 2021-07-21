import React, { Component } from 'react';

export default class TagCategories extends Component {
  render() {
    return (
      <>
        <option selected value="Food">Alimentação</option>
        <option value="Leisure">Lazer</option>
        <option value="Work">Trabalho</option>
        <option value="Transport">Transporte</option>
        <option value="Cheers">Saúde</option>
      </>
    );
  }
}
