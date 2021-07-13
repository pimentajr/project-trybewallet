import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Description extends Component {
  render() {
    const { value, handleChange } = this.props;
    return (
      <label htmlFor="description">
        Descrição:
        <input
          id="description"
          type="text"
          name="description"
          value={ value }
          placeholder="Digite a descrição do produto"
          onChange={ handleChange }
        />
      </label>
    );
  }
}

Description.propTypes = ({
  handleChange: PropTypes.func,
  value: PropTypes.string,
}).isRequired;

export default Description;
