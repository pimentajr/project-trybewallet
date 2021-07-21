import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class DescriptionInput extends Component {
  render() {
    const { funcHandleChange } = this.props;
    return (
      <label htmlFor="description">
        Descrição
        <textarea name="description" id="description" onChange={ funcHandleChange } />
      </label>
    );
  }
}

DescriptionInput.propTypes = {
  funcHandleChange: PropTypes.func,
}.isRequired;
