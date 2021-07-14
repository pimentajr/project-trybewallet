import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Button extends Component {
  render() {
    const { expenses, state } = this.props;
    return (
      <div>
        <button type="button" onClick={ () => expenses(state) }>Adicionar despesa</button>
      </div>
    );
  }
}

Button.propTypes = {
  expenses: PropTypes.func.isRequired,
  state: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default Button;
