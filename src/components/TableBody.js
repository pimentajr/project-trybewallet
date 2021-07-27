import React, { Component } from 'react';
import { IoMdTrash } from 'react-icons/io';
import { AiFillEdit } from 'react-icons/ai';
import PropTypes from 'prop-types';

class TableBody extends Component {
  render() {
    const { index, item, handleClickRemove, handleClickEdit } = this.props;
    return (
      <tr>
        <td>{item.description}</td>
        <td>{item.tag}</td>
        <td>{item.method}</td>
        <td>{item.value}</td>
        <td>{item.exchangeRates[item.currency].name.split('/')[0]}</td>
        <td>{Number(item.exchangeRates[item.currency].ask).toFixed(2)}</td>
        <td>
          {(item.value * item.exchangeRates[item.currency].ask).toFixed(2)}
        </td>
        <td>Real</td>
        <td>
          <button
            data-testid="edit-btn"
            onClick={ () => handleClickEdit(index) }
            type="button"
          >
            <AiFillEdit size="25px" />
          </button>
        </td>
        <td>
          <button
            data-testid="delete-btn"
            onClick={ () => handleClickRemove(index) }
            type="button"
          >
            <IoMdTrash size="25px" />
          </button>
        </td>
      </tr>
    );
  }
}

export default TableBody;

TableBody.propTypes = {
  index: PropTypes.number.isRequired,
  item: PropTypes.shape(PropTypes.object).isRequired,
  handleClickRemove: PropTypes.func.isRequired,
  handleClickEdit: PropTypes.func.isRequired,
};

// Source: auxílio do colega Douglas e consulta ao repositório do Marcos
