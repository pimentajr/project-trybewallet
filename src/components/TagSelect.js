import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class TagSelect extends Component {
  render() {
    const { funcHandleChange } = this.props;
    return (
      <label htmlFor="tag">
        Tag
        <select name="tag" id="tag" onChange={ funcHandleChange }>
          <option>
            Alimentação
          </option>
          <option>
            Lazer
          </option>
          <option>
            Trabalho
          </option>
          <option>
            Transporte
          </option>
          <option>
            Saúde
          </option>
        </select>
      </label>
    );
  }
}

TagSelect.propTypes = {
  funcHandleChange: PropTypes.func,
}.isRequired;
