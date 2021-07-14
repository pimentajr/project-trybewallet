import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Description extends Component {
  render() {
    const { handlerChange, description } = this.props;
    return (
      <label htmlFor="descricao">
        Descrição:
        <input
          id="descricao"
          name="description"
          value={ description }
          onChange={ handlerChange }
        />
      </label>
    );
  }
}

export default Description;

Description.propTypes = {
  handlerChange: PropTypes.func.isRequired,
  description: PropTypes.string.isRequired,
};
