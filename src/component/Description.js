import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Description extends Component {
  render() {
    const { description, handleEvent } = this.props;
    return (
      <label htmlFor="description">
        Descrição:
        <input
          id="description"
          type="text"
          name="description"
          value={ description }
          onChange={ handleEvent }
        />
      </label>
    );
  }
}

Description.propTypes = {
  description: PropTypes.string.isRequired,
  handleEvent: PropTypes.func.isRequired,
};

export default Description;
