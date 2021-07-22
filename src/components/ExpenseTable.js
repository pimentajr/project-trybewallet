import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import ExpenseTableBody from './ExpenseTableBody';

class ExpenseTable extends Component {
  render() {
    const { expenses } = this.props;
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
          { expenses.length > 0 && expenses.map((el, index) => (
            <tr key={ index }>
              <ExpenseTableBody info={ el } />
            </tr>
          )) }
        </tbody>
      </table>
    );
  }
}

ExpenseTable.propTypes = ({
  expenses: PropTypes.arrayOf(PropTypes.object).isRequired,
});

const mapStateToProps = ({ wallet }) => ({
  expenses: wallet.expenses,
});

export default connect(mapStateToProps)(ExpenseTable);
