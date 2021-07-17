import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import editImg from '../images/edit.png';
import deleteImg from '../images/delete.png';

class Table extends React.Component {
  constructor(props) {
    super(props);
    this.state = { };
  }

  render() {
    const { expenses } = this.props;
    console.log(expenses);
    return (
      <table className="table">
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
        <tbody className="tbody">
          {
            expenses.map((ex, index) => {
              const { description, tag, method, currency, value, exchangeRates } = ex;
              return (
                <tr key={ index }>
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
                      <button data-testid="edit-btn" type="button"><img src={ editImg } alt="edit" /></button>
                      <button data-testid="delete-btn" type="button"><img src={ deleteImg } alt="delete" /></button>
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

Table.propTypes = {
  expenses: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default connect(mapStateToProps)(Table);
