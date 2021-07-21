import React, { Component } from 'react';
import PropTypes from 'prop-types';

class DescriptionToAdd extends Component {
  render() {
    const { handleInfo } = this.props;
    return (
      <label htmlFor="description">
        Descrição
        <input
          type="text"
          id="description"
          name="description"
          onChange={ handleInfo }
        />
      </label>
    );
  }
}

DescriptionToAdd.propTypes = {
  handleInfo: PropTypes.func.isRequired,
};

export default DescriptionToAdd;
