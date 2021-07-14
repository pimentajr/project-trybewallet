import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class EditButton extends Component {
  render() {
    const { changeExpense } = this.props;
    return (
      <button type="button" onClick={ changeExpense }>Editar despesa</button>
    );
  }
}

EditButton.propTypes = {
  changeExpense: PropTypes.func.isRequired,
};
