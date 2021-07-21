import React, { Component } from 'react';
import PropTypes from 'prop-types';

class ValueToAdd extends Component {
  render() {
    const { handleInfo } = this.props;
    return (
      <label htmlFor="value">
        Valor
        <input
          type="number"
          id="value"
          name="value"
          onChange={ handleInfo }
        />
      </label>
    );
  }
}

ValueToAdd.propTypes = {
  handleInfo: PropTypes.func.isRequired,
};

export default ValueToAdd;
