import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Description extends Component {
  render() {
    const { value, onChange } = this.props;
    return (
      <div>
        <label htmlFor="description">
          Descrição
          <input
            type="text"
            name="description"
            id="description"
            value={ value }
            onChange={ onChange }
          />
        </label>
      </div>
    );
  }
}

Description.propTypes = ({
  value: PropTypes.number,
  onChange: PropTypes.func,
}).isRequired;

export default Description;
