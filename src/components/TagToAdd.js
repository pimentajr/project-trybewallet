import React, { Component } from 'react';
import PropTypes from 'prop-types';

class TagToAdd extends Component {
  render() {
    const { handleInfo } = this.props;
    return (
      <label htmlFor="tag">
        Tag
        <select
          id="tag"
          name="tag"
          onChange={ handleInfo }
        >
          <option
            value="Alimentação"
          >
            Alimentação
          </option>
          <option
            value="Lazer"
          >
            Lazer
          </option>
          <option
            value="Trabalho"
          >
            Trabalho
          </option>
          <option
            value="Transporte"
          >
            Transporte
          </option>
          <option
            value="Saúde"
          >
            Saúde
          </option>
        </select>
      </label>
    );
  }
}

TagToAdd.propTypes = {
  handleInfo: PropTypes.func.isRequired,
};

export default TagToAdd;
