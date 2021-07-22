import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Description extends Component {
  render() {
    const { description, handleChange } = this.props;
    return (
      <label htmlFor="description">
        Descrição
        <input
          data-testid="description-input"
          type="text"
          name="description"
          id="description"
          onChange={ handleChange }
          value={ description }
        />
      </label>
    );
  }
}

Description.propTypes = {
  description: PropTypes.string.isRequired,
  handleChange: PropTypes.func.isRequired,
};

export default Description;
