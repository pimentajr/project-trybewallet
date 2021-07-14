/* eslint-disable complexity */
import React, { Component } from 'react';
import PropTypes from 'prop-types';

const VALID_FIRST = /^[1-9]{1}$/;
const VALID_NEXT = /^[0-9]{1}$/;
const DELETE_KEY_CODE = 8;

export default class CurrencyInput extends Component {
  constructor(props) {
    super(props);
    this.handleKeyDown = this.handleKeyDown.bind(this);
  }

  handleKeyDown(event) {
    const { value, onValueChange } = this.props;
    const { key, keyCode } = event;

    if (
      (value === 0 && !VALID_FIRST.test(key))
      || (value !== 0 && !VALID_NEXT.test(key)
      && keyCode !== DELETE_KEY_CODE)
    ) {
      return;
    }

    const valueString = value.toString();

    let nextValue;
    if (keyCode !== DELETE_KEY_CODE) {
      const nextValueString = value === 0 ? key : `${valueString}${key}`;
      nextValue = Number.parseInt(nextValueString, 10);
    } else {
      const lastElementIndex = -1;
      const nextValueString = valueString.slice(0, lastElementIndex);
      nextValue = nextValueString === '' ? 0 : Number.parseInt(nextValueString, 10);
    }

    if (nextValue > Number.MAX_SAFE_INTEGER) {
      return;
    }

    onValueChange(nextValue);
  }

  render() {
    const { value, currency } = this.props;
    const valueAbsTrunc = Math.trunc(Math.abs(value));
    if (value !== valueAbsTrunc || !Number.isFinite(value) || Number.isNaN(value)) {
      console.log(typeof value);
      throw new Error('invalid value property');
    }

    const valueDisplay = (value / 100).toLocaleString('pt-BR', {
      style: 'currency',
      currency,
    });

    return (
      <label htmlFor="value-input">
        Valor:
        <input
          id="value-input"
          inputMode="numeric"
          value={ valueDisplay }
          onKeyDown={ this.handleKeyDown }
          onChange={ () => {} }
        />
      </label>
    );
  }
}

CurrencyInput.propTypes = {
  value: PropTypes.number.isRequired,
  currency: PropTypes.string.isRequired,
  onValueChange: PropTypes.func.isRequired,
};
