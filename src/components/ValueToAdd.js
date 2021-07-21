import React, { Component } from 'react';
import PropTypes from 'prop-types';

class ValueToAdd extends Component {
  render() {
    const { handleInfo } = this.props;
    return (
      <label htmlFor="valor">
        Valor
        <input
          type="number"
          id="valor"
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
