import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Button extends Component {
  render() {
    const { expense, state } = this.props;
    return (
      <div>
        <button type="button" onClick={ () => expense(state) }>Adicionar despesa</button>
      </div>
    );
  }
}

export default Button;

Button.propTypes = {
  expense: PropTypes.func.isRequired,
  state: PropTypes.objectOf(PropTypes.string).isRequired,
};
