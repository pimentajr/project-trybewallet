import React, { Component } from 'react';
import PropTypes from 'prop-types';

class ButtonAddExpense extends Component {
  render() {
    const { submitButtonId } = this.props;
    return (
      <div>
        <button type="button" onClick={ () => submitButtonId() }>
          Adicionar despesa
        </button>
      </div>
    );
  }
}

ButtonAddExpense.propTypes = {
  submitButtonId: PropTypes.func.isRequired,
};

export default ButtonAddExpense;
