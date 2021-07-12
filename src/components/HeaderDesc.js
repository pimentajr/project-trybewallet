import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { removeArrayExpenses } from '../actions';
import CompTbHead from './CompTbHead';

const HeaderDesc = (props) => {
  const { expenses, removeItem } = props;
  return (
    <table>
      <thead>
        <CompTbHead />
      </thead>
      <tbody>
        { expenses.map(
          ({ id, description, tag, method, value, currency, exchangeRates }) => (
            <tr key={ id } id={ id }>
              <td>{ description }</td>
              <td>{ tag }</td>
              <td>{ method }</td>
              <td>{ value }</td>
              <td>{ exchangeRates[currency].name.split('/')[0] }</td>
              <td>{ Number(exchangeRates[currency].ask).toFixed(2) }</td>
              <td>
                { Number(exchangeRates[currency].ask) * Number(value) }
              </td>
              <td>Real</td>
              <td>
                <button
                  type="button"
                  data-testid="delete-btn"
                  onClick={ () => removeItem(id) }
                >
                  Deletar
                </button>
                <button
                  type="button"
                  data-testid="edit-btn"
                  onClick="teste"
                >
                  Editar
                </button>
              </td>
            </tr>
          ),
        ) }
      </tbody>
    </table>
  );
};
const mapStateProps = (state) => ({
  expenses: state.wallet.expenses,
});

const mapDispatchToProps = (dispatch) => ({
  removeItem: (value) => dispatch(removeArrayExpenses(value)),
});

export default connect(mapStateProps, mapDispatchToProps)(HeaderDesc);

HeaderDesc.propTypes = {
  removeItem: PropTypes.func.isRequired,
  expenses: PropTypes.arrayOf(PropTypes.object).isRequired,
};
