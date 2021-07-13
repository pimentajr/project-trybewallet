import React from 'react';
import PropTypes from 'prop-types';

export default function ExtendedRow(props) {
  const { user, handleDelete, handleEdit } = props;
  const { description, method, tag, value, exchangeRates, currency, id } = user;
  const { name, ask } = exchangeRates[currency];
  const convertedPrice = ask * value;
  return (
    <tr>
      <td name="description" value={ description } role="cell">
        {description}
      </td>
      <td name="tag" value={ tag } role="cell">
        {tag}
      </td>
      <td name="method" value={ method } role="cell">
        {method}
      </td>
      <td name="value" value={ value } role="cell">
        {value}
      </td>
      <td name="currency" value={ currency } role="cell">
        {name}
      </td>
      <td name="ask" value={ ask } role="cell">
        {parseFloat(ask).toFixed(2)}
      </td>
      <td role="cell">{convertedPrice}</td>
      <td role="cell">Real</td>
      <td>
        <button
          type="button"
          data-testid="edit-btn"
          className="btn fas fa-edit btn-info m-1"
          onClick={ (e) => handleEdit(e) }
        >
          Edit
        </button>
        <button
          id="editButton"
          type="button"
          onClick={ () => handleDelete(id) }
          data-testid="delete-btn"
          className="btn fas fa-trash-alt btn-danger m-1"
        >
          Remove
        </button>
      </td>
    </tr>
  );
}

ExtendedRow.propTypes = {
  user: PropTypes.shape({
    description: PropTypes.string,
    method: PropTypes.string,
    tag: PropTypes.string,
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    exchangeRates: PropTypes.objectOf(PropTypes.object),
    currency: PropTypes.string,
    id: PropTypes.number,
  }).isRequired,
  handleDelete: PropTypes.func.isRequired,
  handleEdit: PropTypes.func.isRequired,
};
