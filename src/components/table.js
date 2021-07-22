import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Thead from '../pages/Thead';
import { deleteExpense } from '../actions';

class table extends React.Component {
  constructor() {
    super();
    this.delItem = this.delItem.bind(this);
  }

  delItem(id) {
    const { delet, tableList } = this.props;
    const changeValues = tableList.filter((item) => item.id !== id);
    delet(changeValues);
  }

  render() {
    const { tableList, expense } = this.props;
    console.log(expense);
    return (
      <div>
        <table>
          <Thead />
          <tbody>
            {tableList.map((item) => (
              <tr key={ item.id }>
                <td>{item.description}</td>
                <td>{item.tag}</td>
                <td>{item.method}</td>
                <td>{item.value}</td>
                <td>{(item.exchangeRates[item.currency].name).split('/')[0]}</td>
                <td>{parseFloat(item.exchangeRates[item.currency].ask).toFixed(2)}</td>
                <td>
                  {parseFloat(item.exchangeRates[item.currency].ask * item.value)
                    .toFixed(2)}
                </td>
                <td>
                  Real
                </td>
                <td>
                  <button type="button" data-testid="edit-btn">Editar</button>
                </td>
                <td>
                  <button
                    type="button"
                    data-testid="delete-btn"
                    onClick={ () => this.delItem(item.id) }
                  >
                    Excluir
                  </button>
                </td>
              </tr>))}
          </tbody>
        </table>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  tableList: state.wallet.expenses,
// tableCoin: state.spending.exchangeRates,
});

const mapDispatchToProps = (dispatch) => ({
  delet: (payload) => dispatch(deleteExpense(payload)),
});

export default connect(mapStateToProps, mapDispatchToProps)(table);

table.propTypes = {
  map: PropTypes.func,
  tableList: PropTypes.arrayOf,
}.isRequired;
