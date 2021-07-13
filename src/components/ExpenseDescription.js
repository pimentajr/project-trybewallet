import React, { Component } from 'react';
import PropTypes from 'prop-types';

class ExpenseDescription extends Component {
  render() {
    const { myValue } = this.props;
    const { description, funcHandleState } = myValue;
    return (
      <label htmlFor="description">
        Descrição
        <input
          name="description"
          type="text"
          id="description"
          value={ description }
          onChange={ funcHandleState }
        />
      </label>
    );
  }
}

ExpenseDescription.propTypes = {
  myValue: PropTypes.shape.isRequired,
  description: PropTypes.string.isRequired,
  funcHandleState: PropTypes.func.isRequired,
};

export default ExpenseDescription;
