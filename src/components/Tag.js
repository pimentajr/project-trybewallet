import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Tag extends Component {
  render() {
    const { up } = this.props;
    return (
      <label htmlFor="tag">
        Tag:
        <select data-testid="tag-input" onChange={ up } id="tag" name="tag">
          <option value="Alimentação">Alimentação</option>
          <option value="Lazer">Lazer</option>
          <option value="Trabalho">Trabalho</option>
          <option value="Transporte">Transporte</option>
          <option value="Saúde">Saúde</option>
        </select>
      </label>
    );
  }
}

export default Tag;

Tag.propTypes = {
  up: PropTypes.func.isRequired,
};

// Source: auxílio do colega Douglas e consulta ao repositório do Marcos
