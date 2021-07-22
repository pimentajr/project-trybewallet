import React, { Component } from 'react';
import PropTypes from 'prop-types';

class PasswordInput extends Component {
  render() {
    const { func, func2 } = this.props;
    return (
      <div className="password-input-container">
        <input
          id="password"
          className="password-input"
          data-testid="password-input"
          type="password"
          placeholder="Digite sua senha"
          onBlur={ func2 }
          onChange={ func }
        />
      </div>
    );
  }
}

export default PasswordInput;

PasswordInput.propTypes = {
  func: PropTypes.func.isRequired,
  func2: PropTypes.func.isRequired,
};
