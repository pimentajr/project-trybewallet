import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Button extends Component {
  render() {
    const { handleClick } = this.props;
    return (
      <button type="button" onClick={ handleClick }>
        Adicionar despesa
      </button>
    );
  }
}

Button.propTypes = {
  handleClick: PropTypes.func.isRequired,
};

export default Button;
