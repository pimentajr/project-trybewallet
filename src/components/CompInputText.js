import React from 'react';
import PropTypes from 'prop-types';

const CompInputText = (props) => {
  const { value, desc, func } = props;
  return (
    <>
      <label htmlFor="value">
        Valor
        <input
          id="value"
          name="value"
          data-testid="value-input"
          value={ value }
          onChange={ func }
          type="text"
        />
      </label>
      <label htmlFor="desc">
        Descrição
        <input
          id="desc"
          name="description"
          data-testid="description-input"
          value={ desc }
          onChange={ func }
          type="text"
        />
      </label>
    </>
  );
};

export default CompInputText;

CompInputText.propTypes = {
  value: PropTypes.string.isRequired,
  desc: PropTypes.string.isRequired,
  func: PropTypes.func.isRequired,
};
