import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class Description extends Component {
  render() {
    const { description, handlerChange } = this.props;

    return (
      <label htmlFor="description">
        Descrição
        <input
          name="description"
          id="description"
          type="text"
          value={ description }
          onChange={ (e) => handlerChange(e) }
          data-testid="description-input"
        />
      </label>
    );
  }
}

Description.propTypes = {
  description: PropTypes.string.isRequired,
  handlerChange: PropTypes.func.isRequired,
};
