import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import editImg from '../images/edit.png';
import deleteImg from '../images/delete.png';
import { deleteExpense } from '../actions';

class Table extends React.Component {
  constructor(props) {
    super(props);
    this.state = { };
    this.renderThead = this.renderThead.bind(this);
  }

  renderThead() {
    return (
      <thead className="thead">
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
    const { expenses, deleteExpense } = this.props;
    return (
      <table className="table">
        {this.renderThead}
        <tbody className="tbody">
          {
            expenses.map((ex) => {
              const { description, tag, method, currency, value, exchangeRates, id } = ex;
              return (
                <tr key={ id }>
                  <td>{description}</td>
                  <td>{tag}</td>
                  <td>{method}</td>
                  <td>{value}</td>
                  <td>{exchangeRates[currency].name.split('/')[0]}</td>
                  <td>{(Number(exchangeRates[currency].ask).toFixed(2))}</td>
                  <td>{(Number(exchangeRates[currency].ask * value).toFixed(2))}</td>
                  <td>Real</td>
                  <td>
                    <div className="action-buttons">
                      <button
                        data-testid="edit-btn"
                        type="button"
                      >
                        <img src={ editImg } alt="edit" />
                      </button>
                      <button
                        data-testid="delete-btn"
                        type="button"
                        onClick={ () => deleteExpense(id) }
                      >
                        <img src={ deleteImg } alt="delete" />
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })
          }
        </tbody>
      </table>
    );
  }
}

const mapStateToProps = (state) => ({
  expenses: state.wallet.expenses,
});

const mapDispatchToProps = (dispatch) => ({
  deleteExpense: (id) => dispatch(deleteExpense(id)),
});

Table.propTypes = {
  expenses: PropTypes.arrayOf(PropTypes.object).isRequired,
  deleteExpense: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Table);
