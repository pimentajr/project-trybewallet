import React, { Component } from 'react';
import PropTypes from 'prop-types';

class FormsDescr extends Component {
  render() {
    const { value, handleChanges } = this.props;
    return (
      <label htmlFor="description">
        Descrição
        <input
          type="text"
          name="description"
          value={ value }
          id="description"
          onChange={ handleChanges }
        />
      </label>
    );
  }
}
export default FormsDescr;

FormsDescr.propTypes = ({
  value: PropTypes.string.isRequired,
  handleChanges: PropTypes.func.isRequired,
});
