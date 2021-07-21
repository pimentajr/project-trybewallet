import React, { Component } from 'react';
import PropTypes from 'prop-types';

class TextInput extends Component {
  render() {
    const {
      label,
    } = this.props;
    return (
      <div>
        <label className="form-label" htmlFor={ `${label}` }>
          { `${label}` }
          <input
            type="text"
            id={ `${label}` }
            className="form-control inputSizing"
          />
        </label>
      </div>
    );
  }
}

export default TextInput;

TextInput.propTypes = {
  label: PropTypes.string.isRequired,
};
