import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Description extends Component {
  render() {
    const { handleChange, description } = this.props;
    return (
      <label htmlFor="description">
        Descrição
        <input
          name="description"
          value={ description }
          type="text"
          placeholder="Descrição da despesa"
          id="description"
          onChange={ handleChange }
        />
      </label>
    );
  }
}

Description.propTypes = ({
  handleChange: PropTypes.func,
}).isRequired;

export default Description;
