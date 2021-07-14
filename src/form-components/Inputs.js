import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Inputs extends Component {
  render() {
    const { value, description, func } = this.props;
    return (
      <div className="firstDiv">
        <label htmlFor="value">
          Valor:
          <input
            type="number"
            name="value"
            id="value"
            min="0"
            value={ value }
            onChange={ func }
            data-testid="value-input"
          />
        </label>
        <label htmlFor="description">
          Descrição:
          <input
            type="text"
            name="description"
            id="description"
            value={ description }
            onChange={ func }
            data-testid="description-input"
          />
        </label>
      </div>
    );
  }
}

Inputs.propTypes = {
  value: PropTypes.number.isRequired,
  description: PropTypes.string.isRequired,
  func: PropTypes.func.isRequired,
};

export default Inputs;
