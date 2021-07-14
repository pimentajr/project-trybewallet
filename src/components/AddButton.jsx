import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class AddButton extends Component {
  render() {
    const { addExpense } = this.props;
    return (
      <button type="button" onClick={ addExpense }>Adicionar despesa</button>
    );
  }
}

AddButton.propTypes = {
  addExpense: PropTypes.func.isRequired,
};
