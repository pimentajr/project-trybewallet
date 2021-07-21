import React, { Component } from 'react';
import PropTypes from 'prop-types';

class DescriptionToAdd extends Component {
  render() {
    const { handleInfo } = this.props;
    return (
      <label htmlFor="descricao">
        Descrição
        <input
          type="text"
          id="descricao"
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
