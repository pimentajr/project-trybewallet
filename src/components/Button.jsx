import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Button extends Component {
  render() {
    const { addExpense } = this.props;
    return (
      <button type="button" onClick={ addExpense }>
        Adicionar despesa
      </button>
    );
  }
}

Button.propTypes = {
  addExpense: PropTypes.func.isRequired,
};

export default Button;
