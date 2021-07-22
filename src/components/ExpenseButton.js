import React from 'react';
import PropTypes from 'prop-types';

class ExpenseButton extends React.Component {
  render() {
    const { handler } = this.props;

    return (
      <button
        type="button"
        name="adicionar despesa"
        onClick={ handler }
      >
        Adicionar despesa
      </button>
    );
  }
}

ExpenseButton.propTypes = {
  handler: PropTypes.func,
}.isRequired;

export default ExpenseButton;
