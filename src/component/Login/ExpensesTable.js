import React from 'react';
import withStore from '../../utils/withStore';
import { deleteExpense as deleteExpenseAgent } from '../../agents';

class ExpensesTable extends React.Component {
  constructor(props) {
    super(props);

    this.handleDeleteItem = this.handleDeleteItem.bind(this);
  }

  handleDeleteItem(id) {
    const { deleteExpense } = this.props;

    deleteExpense(id);
  }

  renderTableHeader() {
    return (
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
    );
  }

  render() {
    const { startEdit, wallet } = this.props;
    return (
      <table>
        {this.renderTableHeader()}
        <tbody>
          { wallet.expenses.map((expense) => {
            const { currency, description, exchangeRates,
              id, method, tag, value } = expense;

            const usedExchange = parseFloat(exchangeRates[currency].ask);
            const convertedValue = usedExchange * parseFloat(value);
            const [convertedFrom] = exchangeRates[currency].name.split('/');

            return (
              <tr key={ id }>
                <td>{description}</td>
                <td>{tag}</td>
                <td>{method}</td>
                <td>{value}</td>
                <td>{convertedFrom}</td>
                <td>{usedExchange.toFixed(2)}</td>
                <td>{convertedValue.toFixed(2)}</td>
                <td>Real</td>
                <td>
                  <button
                    type="button"
                    data-testid="edit-btn"
                    onClick={ () => startEdit(expense) }
                  >
                    {' '}
                    Editar
                  </button>
                  <button
                    type="button"
                    data-testid="delete-btn"
                    onClick={ () => this.handleDeleteItem(id) }
                  >
                    Excluir
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    );
  }
}

ExpensesTable.propTypes = {
  deleteExpense: PropTypes.func,
  startEdit: PropTypes.func,
  wallet: PropTypes.shape({
    expenses: PropTypes.arrayOf(
      PropTypes.shape({
        currency: PropTypes.string,
        description: PropTypes.string,
        exchangeRates: PropTypes.arrayOf(
          PropTypes.shape({
            ask: PropTypes.string,
          }),
        ),
        id: PropTypes.string,
        method: PropTypes.string,
        tag: PropTypes.string,
        value: PropTypes.string,
      }),
    ),
  }),
}.isRequired;

export default withStore(ExpensesTable, ['wallet'], [deleteExpenseAgent]);
