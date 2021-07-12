import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { removeArrayExpenses } from '../actions';

const HeaderDesc = (props) => {
  const { expenses, removeItem } = props;
  return (
    <table>
      <thead>
        <tr>
          <th>Descrição</th>
          <th>Tag</th>
          <th>Método de pagamento</th>
          <th>Valor</th>
          <th>Moeda</th>
          <th>Câmbio utilizado</th>
          <th>Valor convertido</th>
          <th>Moeda de conversão</th>
          <th>Editar/Excluir</th>
        </tr>
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
